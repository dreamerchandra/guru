import { getDataFromQuerySnapShot, ref } from "../firebase-helper";

export default function categoryApi (http, baseUrl, responseWrapper) {

  return {
    
    getMine: async () => {
      return getDataFromQuerySnapShot('id', await ref().category.get())
    }

  }
}