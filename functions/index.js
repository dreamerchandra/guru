const functions = require("firebase-functions");
const admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  apiKey: "AIzaSyA8ppkrYQVZ0VL9u2jpnjarDk3-C9tWqVY",
  authDomain: "staging-prodigie.firebaseapp.com",
  databaseURL: "https://staging-prodigie.firebaseio.com",
  projectId: "staging-prodigie",
  storageBucket: "staging-prodigie.appspot.com",
  messagingSenderId: "478218619325",
  appId: "1:478218619325:web:b3fa068c42450849",
});
admin.firestore().settings({ ignoreUndefinedProperties: true })

const ref = {
  batch: admin.firestore().collection('Batches'),
  chapter: admin.firestore().collection('Chapter'),
  folder: admin.firestore().collection('Folder'),
}

const withAuth = (cb) => {
  return (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    functions.logger.log("auth user", context.auth.uid);
    return cb(data, context);
  };
};

exports.updateRole = functions.https.onCall(withAuth(async (data, context) => {
  const uid = context.auth.uid;
  const role = data.role;
  functions.logger.log(`updating user claims for ${context.auth.uid} with ${role}`);
  await admin.auth().setCustomUserClaims(uid, { role });
  return { role, uid, code: 200 };
}));

const isEmailExist = async (email) => {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (err) {
    return Promise.reject(new Error(email))
  }
}

const updateBatchesForChapter = async (chapterId, batches) => {
  return admin.firestore().collection('Chapter').doc(chapterId).update({
    batches,
  })
}

const getKeyFromDataSnap = (snap, key, defaultReturn) => {
  if (!snap.exists) return defaultReturn;
  const data = snap.data()
  if (!data) return defaultReturn;
  return data[key];
}

const updateBatchCollection = async (newStudents, ownerId) => {
  functions.logger.log(`Starting to update batches and chapter collection for teacher id ${ownerId}.`);
  const oldStudents = getKeyFromDataSnap(await ref.batch.doc(ownerId).get(), 'students', []);
  const oldIds = oldStudents.map(({ id }) => id);
  functions.logger.log(`Already as a part of batch: Student IDs ${JSON.stringify(oldIds)}.`);
  functions.logger.log(`New students as per update request ${JSON.stringify(newStudents)}.`);
  const students = [...oldStudents, ...newStudents.filter(({ id }) => !oldIds.includes(id))];
  const newIds = students.map(({ id }) => id);
  functions.logger.log(`Union between old and new student ids ${JSON.stringify(newIds)}.`);
  await ref.batch.doc(ownerId).set({ students });
  functions.logger.log(`Update to batches collection successful`);
  return { students, newIds };
}

const updateBatches = async (userRecord, ownerId) => {
  const userInfo = userRecord.map(({ value }) => ({
    id: value.uid,
    displayName: value.displayName,
  }));
  const { newIds } = await updateBatchCollection(userInfo, ownerId);
  const chapters = await admin.firestore().collection('Chapter').where('createdBy', '==', ownerId).get();
  const chapterIds = chapters.docs.map((doc) => doc.id);
  functions.logger.log(`Chapter IDs to be updated: ${JSON.stringify(chapterIds)}.`);
  return Promise.allSettled(chapterIds.map(async (id) => await updateBatchesForChapter(id, newIds)))
}

exports.createBatch = functions.https.onCall(withAuth(async (data, context) => {
  const { emails = [] } = data;
  if (emails.length === 0) {
    functions.logger.warn(`No email found to update`);
    throw new functions.https.HttpsError('invalid-argument', 'no Email to Update');
  }
  functions.logger.log(`starting updating batches for user: ${context.auth.uid} with emails: ${emails}`);
  const userRecord = await Promise.allSettled(emails.map(isEmailExist));
  const invalidEmail = userRecord.filter((record) => record.status === 'rejected').map(({ reason }) => reason.message);
  if (invalidEmail.length) {
    functions.logger.warn(`invalid emails: ${invalidEmail}. Throwing error`);
    throw new functions.https.HttpsError('invalid-argument', JSON.stringify(invalidEmail));
  }
  functions.logger.log(`no invalid emails found`);
  return updateBatches(userRecord, context.auth.uid).then((updates) => {
    if (updates.some((record) => record.status === 'rejected')) {
      functions.logger.warn(`Some batches aren't updated successfully... full update details:${updates}.`);
      functions.logger.warn(`Raising error`);
      throw new functions.https.HttpsError('invalid-argument', JSON.stringify(updates));
    }
    functions.logger.log(`Chapter and Batches associated with teacher collection updated successfully`);
    return { code: 200 };
  });
}));


// exports.forChapterIndex = functions.https.onCall(async (data, context) => {
//   try {
//     const uid = context.auth.uid;
//     return await ref.chapter.where('createdBy', '==', uid).orderBy('lastModifiedAt', 'desc').limit(20).get();
//   } catch (err) {
//     functions.logger.log("err to create index", err);
//   }
// });


// exports.forFolderIndex = functions.https.onCall(async (data, context) => {
//   try {
//     const uid = context.auth.uid;
//     return await ref.folder.where('createdBy', '==', uid).orderBy('lastModifiedAt', 'desc').limit(20).get();
//   } catch (err) {
//     functions.logger.log("err to create index", err);
//   }
// });