import { getCurrentUser } from "../firebase-auth";
import { ref } from "../firebase-helper";


export default function acquaintanceApi (http, baseUrl, responseWrapper) {

  return {

    getMine: async () => {
      const snap = await ref().user.doc(getCurrentUser()).get()
      return snap.exists ? snap.data() : []
    },
    create: async (data) => {
      return ref().user.doc(getCurrentUser()).set(data);
    }

  }
}