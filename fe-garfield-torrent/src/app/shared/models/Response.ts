import { HttpErrorResponse } from '@angular/common/http';
import { Torrent } from './Torrent';
import { User } from './User';

export interface UserResponse extends User {
  _id: string
}

export interface TorrentResponse extends Torrent {
  _id: string
}

export interface FieldValidationError {
  field: string,
  message: string
}

export interface ValidationError {
  errors: FieldValidationError[]
}

export type ResponseError = ValidationError | null;

export function fromErrorResponse(respObj: HttpErrorResponse): ResponseError {
  if (respObj.status == 400) {
    const error = respObj.error;
    let validationErrors: FieldValidationError[] = [];
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

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ResponseErrorToString(err: ResponseError | string) {
  let errorMsg = "";
  if (!err || (err as string).length) {
    console.log(err)
    return "Something went wrong...";
  }
  (err as ValidationError).errors.forEach(err => {
    errorMsg += capitalizeFirstLetter(err.field) + ": " + capitalizeFirstLetter(err.message) + "\n";
  })
  return errorMsg;
}