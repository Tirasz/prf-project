import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User, fromUserResponse } from '../../models/User';
import { UserResponse, fromErrorResponse } from '../../models/Response';

const BASE_URL = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this.http.post<UserResponse>(BASE_URL, user).pipe(
      map(user => fromUserResponse(user)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<UserResponse[]>(BASE_URL).pipe(
      map(users => users.map(user => fromUserResponse(user))),
      catchError(err => throwError(() => fromErrorResponse(err)))
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<UserResponse>(BASE_URL + '/' + userId).pipe(
      map(user => fromUserResponse(user)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  updateUser(user: Partial<User>): Observable<User> {
    if (user.id)
      return this.http.put<UserResponse>(BASE_URL + '/' + user.id, user).pipe(
        map(user => fromUserResponse(user)),
        catchError(err => throwError(() => fromErrorResponse(err)))
      );
    return throwError(() => 'Tried to update a user with no id!');
  }

  deleteUserFromId(userId: string): Observable<User> {
    return this.http.delete<UserResponse>(BASE_URL + '/' + userId).pipe(
      map(user => fromUserResponse(user)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  deleteUser(user: User): Observable<User> {
    if (user.id)
      return this.deleteUserFromId(user.id);
    return throwError(() => 'Tried to delete a user with no id!');
  }

  promoteUser(user: User): Observable<User> {
    if (user.id)
      return this.http.put<UserResponse>(BASE_URL + '/' + user.id, {}).pipe(
        map(user => fromUserResponse(user)),
        catchError(err => throwError(() => fromErrorResponse(err)))
      );
    return throwError(() => 'Tried to promote a user with no id!');
  }

}
