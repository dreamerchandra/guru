import Defer from "../defer";
import { getCurrentUser } from "../firebase-auth";
import { convertImgToDownloadPath, getDataFromQuerySnapShot, getServerTimeStamp, ref, storageRef } from "../firebase-helper";


const uploadFile = async (cardId, chapterId, file) => {
  const chapterRef = storageRef(chapterId).chapter;
  const bucketRef = storageRef(`${cardId}/original`).card(chapterRef)
  console.log(bucketRef)
  return {
    task: bucketRef.put(file),
    fullPath: bucketRef.fullPath,
  }
}

const checkConceptData = (data) => {

  if (typeof data.title !== 'string' && data.title > 25) return 'title';
  if (typeof data.description !== 'string' && data.description > 1000) return 'description';

  const keys = Object.keys(data);
  const allowedKeys = ['title', 'description'];
  const isKeysVerified = keys.filter(key => !allowedKeys.includes(key)).length === 0;
  if (!isKeysVerified) return 'Not allowed keys'

  return true;
}


const checkMcq = (fields) => {
  if (!fields.question) return "Question";
  if (!Array.isArray(fields.options) || fields.options.length > 2)
    return "Option";
  if (!fields.answerKey?.[0]?.answerId ?? null) return "Answer";
  return true;

}

export default function cardsApi (http, baseUrl, responseWrapper) {
  return {

    get: async (chapterId, pageSize) => {
      const snap = await ref(chapterId).cards.get()
      return Promise.all(
        getDataFromQuerySnapShot('id', snap).map(convertImgToDownloadPath('imgUrl'))
      );
    },

    createConcept: async ({ chapterId, fields }) => {
      const data = {
        ...fields,
        imgUrl: '',
        createdBy: getCurrentUser(),
        lastModifiedAt: getServerTimeStamp(),
        type: 'concept'
      }

      checkConceptData(data);

      const newDoc = ref(chapterId).cards.doc();

      const { fullPath, task } = await uploadFile(newDoc.id, chapterId, fields.imgUrl.files[0]);
      const uploadPromise = new Defer()
      task.then(uploadPromise.resolve);

      return Promise.all([
        newDoc.set({ ...data, imgUrl: fullPath }),
        uploadPromise
      ]);
    },

    createMcq: async ({ chapterId, fields }) => {
      const data = {
        ...fields,
        imgUrl: '',
        createdBy: getCurrentUser(),
        lastModifiedAt: getServerTimeStamp(),
        type: 'question'
      }
      checkMcq(data);

      const newDoc = ref(chapterId).cards.doc();

      const { fullPath = '', task } = fields.imgUrl ? await uploadFile(newDoc.id, chapterId, fields.imgUrl.files[0]) : { task: Promise.resolve() };
      const uploadPromise = new Defer()
      task.then(uploadPromise.resolve);

      return Promise.all([
        newDoc.set({ ...data, imgUrl: fullPath }),
        uploadPromise
      ]);
    }

  }
}