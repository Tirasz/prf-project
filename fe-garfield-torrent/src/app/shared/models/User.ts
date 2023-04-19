import { HttpErrorResponse } from '@angular/common/http';

export interface User {
  id?: string,
  email: string,
  username: string,
  password: string,
  accessLevel: number,
  memberSince?: Date
};

export interface UserResponse extends User {
  _id: string
}

interface UserFieldValidationError {
  field: string,
  message: string
}

interface UserValidationError {
  errors: UserFieldValidationError[]
}

export type UserResponseError = UserValidationError | null;

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ResponseErrorToString(err: UserResponseError | string) {
  let errorMsg = "";
  if (!err || (err as string).length) {
    console.log(err)
    return "Something went wrong...";
  }
  (err as UserValidationError).errors.forEach(err => {
    errorMsg += capitalizeFirstLetter(err.field) + ": " + capitalizeFirstLetter(err.message) + "\n";
  })
  return errorMsg;
}

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

export function fromResponseObject(respObj: UserResponse): User {
  return {
    id: respObj._id,
    email: respObj.email,
    username: respObj.username,
    password: respObj.password,
    accessLevel: respObj.accessLevel,
    memberSince: respObj.memberSince
  };
}

export interface UserCredentials {
  username: string, // email
  password: string
}

