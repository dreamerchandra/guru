import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import { isValidUrl } from './helper'

export const ref = (docId) => {
  const db = firebase.firestore()
  return {
    category: db.collection('Category'),
    folder: db.collection('Folder'),
    chapter: db.collection('Chapter'),
    cards: db.collection('Chapter').doc(docId).collection('Cards'),
    batches: db.collection('Batches'),
    db,
  }
}

export const storageRef = (fileName) => {
  const storage = firebase.storage()
  return {
    folder: storage.ref().child(`folder/${fileName}`),
    chapter: storage.ref().child(`chapter/${fileName}`),
    userImg: storage.ref().child(`user/${fileName}`),
    card: (chapterRef) => chapterRef.child(`/card/${fileName}`),
    storage,
  }
}

export const functionRef = () => {
  return {
    createBatch: firebase.functions().httpsCallable('createBatch'),
    updateRole: firebase.functions().httpsCallable('updateRole')
  }
}


export const getDataFromQuerySnapShot = (idKey, documentData) => {
  const returnResult = []
  documentData.forEach((doc) => {
    const data = doc.data()
    const { id } = doc
    if (idKey) {
      returnResult.push({
        ...data,
        [idKey]: id,
      })
    } else {
      returnResult.push({
        ...data,
      })
    }
  })
  return returnResult
}



export function getServerTimeStamp () {
  return firebase.firestore.FieldValue.serverTimestamp()
}


export const CACHE_TIME = 5 * 30 * 1000;


export async function getStorageUrl (path) {
  return firebase.storage().ref(path).getDownloadURL()
}

export const convertImgToDownloadPath = (imgKey = 'titleImg') => async (data, ) => {
  const titleImg = isValidUrl(data[imgKey]) ? data[imgKey] : await getStorageUrl(data[imgKey])
  return { ...data, [imgKey]: titleImg }
}
