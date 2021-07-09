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

const withAuth = (cb) => {
  return (data, context) => {
    console.log("auth user", context.auth);
    if (!context.auth) {
      return {
        message: "Authentication Required!",
        code: 401,
      };
    }
    return cb(data, context);
  };
};

exports.updateRole = functions.https.onCall(withAuth(async (data, context) => {
  const uid = context.auth.uid;
  const role = data.role;
  await admin.auth().setCustomUserClaims(uid, {role});
  return {role, uid, code: 200};
}));
