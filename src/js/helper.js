import { v4 as uuidv4 } from 'uuid';

export function parseAutoGeneratedError (string) {
  return string?.split?.('.')?.[1] ?? false;
}

export class InternalError extends Error {
  constructor (msg, code) {
    const error = new Error(msg);
    error.code = code;
    return error;
  }
}


export const isValidUrl = (url) => {
  try {
    return new URL(url);
  } catch (err) {
    return false
  }
} 


export const getUuid = () => {
  return uuidv4()
}