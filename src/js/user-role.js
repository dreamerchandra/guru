import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

export const ROLE = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TEACHER: 'teacher',
  NA: 'na',
}

export default class UserRole {
  static role = ROLE.NA
  static token = null;

  static roleChangeListeners = []


  static getRefreshToken = async (force) => {
    if (!force && this.token) return this.token;
    if (!firebase.auth().currentUser) return

    this.token = await firebase.auth().currentUser.getIdTokenResult(force)
    return this.token
  }

  static updateRole = async (forceUpdate) => {
    if (this.role !== ROLE.NA) return this.role;

    const result = await this.getRefreshToken(forceUpdate);
    const role = result?.claims?.role;

    console.log('in updating role, got new role:', role);
    if (!role) return;

    const newRole = role === ROLE.ADMIN ? ROLE.ADMIN : role === ROLE.TEACHER ? ROLE.TEACHER : ROLE.STUDENT
    this.updateListenersOnRoleChange(this.role, newRole)
    this.role = newRole;
    return this.role;
  }

  static createRole = async (role) => {
    if (!Object.values(ROLE).includes(role)) throw new Error('undefined role')
    const { data: { code } } = await firebase.functions().httpsCallable('updateRole')({ role });
    console.log('status code for updating role is ', code);
    if (code !== 200) return;
    return this.updateRole(true);
  }

  static updateListenersOnRoleChange = (oldRole, newRole) => {
    if (oldRole === newRole) return
    this.roleChangeListeners.forEach((listener) => {
      listener?.(newRole)
    })
  }

  /**
   *
   * @param {UserRoleOnRoleChange} onChange
   */
  static onRoleChange = (onChange) => {
    this.roleChangeListeners.push(onChange)
  }
}
