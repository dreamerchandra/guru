import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export const ref = () => {
  const db = firebase.firestore()
  return {
    category: db.collection('Category'),
    folder: db.collection('Folder'),
    chapter: db.collection('Chapter'),
    db,
  }
}

export const storageRef = (fileName) => {
  const storage = firebase.storage()
  return {
    folder: storage.ref().child(`folder/${fileName}`),
    chapter: storage.ref().child(`chapter/${fileName}`),
    storage,
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


export function getServerTimeStamp() {
  return firebase.firestore.FieldValue.serverTimestamp()
}


export const CACHE_TIME = 5 * 30 * 1000;


export async function getStorageUrl (path) {
  return firebase.storage().ref(path).getDownloadURL()
}