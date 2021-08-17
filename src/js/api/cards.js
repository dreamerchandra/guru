import { QUESTION_TYPE } from "../../Component/Model/QuestionCard";
import Defer from "../defer";
import { getCurrentUser } from "../firebase-auth";
import { convertImgToDownloadPath, getDataFromQuerySnapShot, getServerTimeStamp, ref, storageRef } from "../firebase-helper";


const uploadFile = async (cardId, chapterId, file, fileName='original') => {
  if (!file) {
    return {
      task: Promise.resolve(null), fullPath: undefined,
    }
  }

  const chapterRef = storageRef(chapterId).chapter;
  const bucketRef = storageRef(`${cardId}/${fileName}`).card(chapterRef)
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
      const snap = await ref(chapterId).cards.orderBy('lastModifiedAt', 'desc').get()
      return Promise.all(
        getDataFromQuerySnapShot('id', snap).map(convertImgToDownloadPath('imgUrl'))
      );
    },

    upsertConcept: async ({ chapterId, fields, cardId = null }) => {
      const oldImgUrl = typeof (fields.imgUrl) === 'string' ? fields.imgUrl : '';
      const data = {
        ...fields,
        imgUrl: oldImgUrl,
        createdBy: getCurrentUser(),
        lastModifiedAt: getServerTimeStamp(),
        type: 'concept'
      }

      checkConceptData(data);

      const docRef = cardId ? ref(chapterId).cards.doc(cardId) : ref(chapterId).cards.doc();

      const { fullPath = oldImgUrl, task } = await uploadFile(docRef.id, chapterId, fields.imgUrl?.files?.[0]);
      const uploadPromise = new Defer()
      task.then(uploadPromise.resolve);

      console.log('creating an concept with payload', { ...data, imgUrl: fullPath })

      return Promise.all([
        docRef.set({ ...data, imgUrl: fullPath }),
        uploadPromise
      ]);
    },

    upsertMcq: async ({ chapterId, fields, cardId = null }) => {
      const oldImgUrl = typeof (fields.imgUrl) === 'string' ? fields.imgUrl : '';
      const data = {
        ...fields,
        imgUrl: oldImgUrl,
        createdBy: getCurrentUser(),
        lastModifiedAt: getServerTimeStamp(),
        type: 'question',
        subType: QUESTION_TYPE.MCQ,
      }
      checkMcq(data);

      const docRef = cardId ? ref(chapterId).cards.doc(cardId) : ref(chapterId).cards.doc();

      const { fullPath = oldImgUrl, task } = fields.imgUrl ? await uploadFile(docRef.id, chapterId, fields.imgUrl.files[0]) : { task: Promise.resolve() };
      const uploadPromise = new Defer()
      task.then(uploadPromise.resolve);

      return Promise.all([
        docRef.set({ ...data, imgUrl: fullPath }),
        uploadPromise
      ]);
    },

    upsertMatch: async ({ chapterId, fields, cardId = null }) => {
      const data = {
        fields: fields.map(field => ({
          ...field,
          qImg: typeof (field.qImg) === 'string' ? field.qImg : '',
          aImg: typeof (field.aImg) === 'string' ? field.aImg : '',
        })) ,
        createdBy: getCurrentUser(),
        lastModifiedAt: getServerTimeStamp(),
        type: 'question',
        subType: QUESTION_TYPE.MATCH,
      }

      const docRef = cardId ? ref(chapterId).cards.doc(cardId) : ref(chapterId).cards.doc();

      const uploadTaskInfo = fields.map(async (field) => {
        return {
          qImg:  await uploadFile(docRef.id, chapterId, field.qImg?.files?.[0] ?? ''),
          aImg: await uploadFile(docRef.id, chapterId, field.aImg?.files?.[0] ?? '')
        } 
      })
      const uploadPromise = uploadTaskInfo.map(async (promise, idx) => {
        const info = await promise
        data.fields[idx].qImg = info.qImg.fullPath;
        data.fields[idx].aImg = info.aImg.fullPath;

        const qImgPromise = new Defer();
        const aImgPromise = new Defer();
        return [info.qImg.task.then(qImgPromise.resolve), info.aImg.task.then(aImgPromise.resolve)];
      });

      return Promise.all([
        docRef.set({ ...data }),
        ...uploadPromise.map((info) => info[0]),
        ...uploadPromise.map((info) => info[1]),
      ]);
    }

  }
}