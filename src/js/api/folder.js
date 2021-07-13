import { getDataFromQuerySnapShot, ref } from "../firebase-helper";
import { getCurrentUser } from '../firebase-auth'

export default function folderApi (http, baseUrl, responseWrapper) {

  return {

    getMine: async () => {
      const snap = await ref().folder.where('createdBy', '==', getCurrentUser()).get()
      return getDataFromQuerySnapShot('id', snap);
    }

  }
}