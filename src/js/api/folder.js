import { getCurrentUser } from '../firebase-auth';
import { getDataFromQuerySnapShot, getServerTimeStamp, ref } from "../firebase-helper";
import Paginate from "../pagenate";


const paginate = new Paginate('my.folder');
export { paginate as folderPaginate };

export default function folderApi (http, baseUrl, responseWrapper) {

  return {

    getMine: async () => {
      const snap = await ref().folder
        .where('createdBy', '==', getCurrentUser())
        .orderBy('lastModifiedAt', 'desc').get()
      return getDataFromQuerySnapShot('id', snap);

    },

    create: async (payload) => {
      const data = {
        ...payload,
        createdBy: getCurrentUser(),
        createdAt: getServerTimeStamp(),
        lastModifiedAt: getServerTimeStamp(),
      }
      return ref().folder.add(data)
    }

  }
}
