import 'firebase/functions';
import studentIcon from "../../asserts/svg/student.svg";
import { getCurrentUser } from '../firebase-auth';
import { functionRef, getStorageUrl, ref, storageRef } from "../firebase-helper";

const addImgUrlToStudent = async (student) => {
  try {
    const uri = storageRef(`${student.id}/original`).userImg.fullPath;
    console.log(uri)
    const imgUrl = await getStorageUrl(uri);
    return {
      ...student,
      imgUrl
    }
  } catch (err) {
    return {
      ...student,
      imgUrl: studentIcon

    }
  }
}

const addImgUrlToStudents = async (students) => {
  return Promise.all(students.map(addImgUrlToStudent))
}

export default function batchApi (http, baseUrl, responseWrapper) {

  return {

    getMine: async () => {
      const batchSnap = await ref().batches.doc(getCurrentUser()).get();
      const students = (batchSnap).data()?.students ?? [];
      return addImgUrlToStudents(students)
    },

    create: async (emails) => {
      return await functionRef().createBatch({ emails });
    }

  }
}
