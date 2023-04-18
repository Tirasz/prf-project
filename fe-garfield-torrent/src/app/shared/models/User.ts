import { HttpErrorResponse } from '@angular/common/http';

export interface User {
  id?: string,
  email: string,
  username: string,
  password: string,
  accessLevel: number,
  memberSince?: Date
};

interface UserFieldValidationError {
  field: string,
  message: string
}

interface UserValidationError {
  errors: UserFieldValidationError[]
}

export type UserResponseError = UserValidationError | null;

export function fromErrorResponse(respObj: HttpErrorResponse): UserValidationError | null {
  if (respObj.status == 400) {
    const error = respObj.error;
    let validationErrors: UserFieldValidationError[] = [];
    for (const key in error.errors) {
      validationErrors.push({
        field: key,
        message: error.errors[key].message
      })
    }
    return { errors: validationErrors };
  }
  return null;
}

export function fromResponseObject(respObj: any): User {
  return { ...respObj, id: respObj._id };
}

export interface UserCredentials {
  username: string, // email
  password: string
}

