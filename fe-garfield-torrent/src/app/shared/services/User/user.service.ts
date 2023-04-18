import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { UserResponseError, User, fromErrorResponse, fromResponseObject } from '../../models/User';

const BASE_URL = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this.http.post(BASE_URL, user).pipe(
      map(user => fromResponseObject(user)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(BASE_URL).pipe(
      map(users => users.map(user => fromResponseObject(user))),
      catchError(err => throwError(() => fromErrorResponse(err)))
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<any[]>(BASE_URL + '/' + userId).pipe(
      map(user => fromResponseObject(user)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  updateUser(user: Partial<User>): Observable<User> {
    if (user.id)
      return this.http.put(BASE_URL + '/' + user.id, user).pipe(
        map(user => fromResponseObject(user)),
        catchError(err => throwError(() => fromErrorResponse(err)))
      );
    return throwError(() => 'Tried to update a user with no id!');
  }

  deleteUserFromId(userId: string): Observable<User> {
    return this.http.delete(BASE_URL + '/' + userId).pipe(
      map(user => fromResponseObject(user)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  deleteUser(user: User): Observable<User> {
    if (user.id)
      return this.deleteUserFromId(user.id);
    return throwError(() => 'Tried to delete a user with no id!');
  }

}
