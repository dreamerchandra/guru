import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import { functionRef } from './firebase-helper'

export const ROLE = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TEACHER: 'teacher',
  ACQUAINTANCE: 'acquaintance',
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

  static getRoleFromFirebase (firebaseRole) {
    const availableRole = Object.entries(ROLE);
    const selectedRole = availableRole.find(([, roleValue]) => firebaseRole === roleValue);
    const [roleKey] = selectedRole || []
    return roleKey ? ROLE[roleKey]: ROLE.NA
  }

  static updateRole = async (forceUpdate) => {
    if (this.role !== ROLE.NA) return this.role;

    const result = await this.getRefreshToken(forceUpdate);
    const role = result?.claims?.role;

    console.log('in updating role, got new role:', role);
    if (!role) return;

    const newRole = this.getRoleFromFirebase(role)
    this.updateListenersOnRoleChange(this.role, newRole)
    this.role = newRole;
    return this.role;
  }

  static createRole = async (role) => {
    if (!Object.values(ROLE).includes(role)) throw new Error('undefined role')
    const { data: { code } } = await functionRef().updateRole({ role });
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
