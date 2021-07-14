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
    }

  }
}