import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/functions'

export async function googleLogin () {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export const ROLE = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TEACHER: 'teacher',
}

function getRefreshTokenClosure () {
  let token = null;
  return async (force = false) => {

    if (!force && token) return token;
    if (!firebase.auth().currentUser) return

    token = await firebase.auth().currentUser.getIdTokenResult(force)
    return token
  }
}

const getRefreshToken = getRefreshTokenClosure()

function getUserRoleClosure () {
  let userRole = ''
  return async (forceUpdate) => {
    if (userRole) return userRole;
    const result = await getRefreshToken(forceUpdate);
    const role = result?.claims?.role;

    if (!role) return;

    userRole = role === ROLE.ADMIN ? ROLE.ADMIN : role === ROLE.TEACHER ? ROLE.TEACHER : ROLE.STUDENT
    return userRole
  }
}


export const getUserRole = getUserRoleClosure()

export async function updateRole (role) {
  if (!Object.values(ROLE).includes(role)) throw new Error('undefined role')
  const { data: { code } } = await firebase.functions().httpsCallable('updateRole')({ role });
  console.log('status code for updating role is ', code);
  if (code !== 200) return;
  return getUserRole(true);
}
