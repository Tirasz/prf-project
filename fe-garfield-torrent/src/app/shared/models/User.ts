import { UserResponse } from './Response';

export interface User {
  id?: string,
  email: string,
  username: string,
  password: string,
  accessLevel: number,
  memberSince?: Date
};

export function fromUserResponse(respObj: UserResponse): User {
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

