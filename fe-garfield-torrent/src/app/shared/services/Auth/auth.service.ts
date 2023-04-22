import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';
import { User, UserCredentials, fromResponseObject } from '../../models/User';
import { UserResponse } from '../../models/Response';

const BASE_URL = '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
    this.refreshCurrentUser();
  }

  currentUser = new BehaviorSubject<User | null>(null);

  login(credentials: UserCredentials): Observable<boolean> {
    return this.http.post(BASE_URL + '/login', credentials).pipe(
      tap(() => this.refreshCurrentUser()),
      delay(200),
      map(() => {
        return true;
      }),
      catchError(err => { console.log(err); return of(false) })
    )
  }

  logout(): Observable<boolean> {
    return this.http.post(BASE_URL + '/logout', {}).pipe(
      tap(() => this.refreshCurrentUser()),
      delay(200),
      map(() => {
        return true;
      }),
      catchError(err => { console.log(err); return of(false) })
    )
  }

  refreshCurrentUser(): void {
    this.http.get<UserResponse>(BASE_URL + '/status').pipe(
      map(result => {
        if (result._id)
          return fromResponseObject(result);
        return null;
      }),
      catchError(err => of(null))
    ).subscribe(result => this.currentUser.next(result));
  };

}
