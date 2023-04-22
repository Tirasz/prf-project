import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/User/user.service';
import { User } from '../../shared/models/User';
import { Observable, catchError, filter, first, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { AuthService } from '../../shared/services/Auth/auth.service';

@Component({
  selector: 'app-user-browser',
  templateUrl: './user-browser.component.html',
  styleUrls: ['./user-browser.component.scss']
})
export class UserBrowserComponent implements AfterViewInit {

  columnNames: string[] = ['username', 'email', 'memberSince', 'accessLevel', 'actions']
  dataSource = new MatTableDataSource<User>();
  currentUser: Observable<User | null>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notifications: NotificationService,
  ) {
    this.currentUser = this.authService.currentUser.asObservable();
  }

  ngAfterViewInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnInit(): void { }

  deleteUser(user: User) {
    this.userService.deleteUser(user).pipe(
      filter(user => Boolean(user)),
      switchMap(result => {
        this.authService.refreshCurrentUser();
        return this.userService.getAllUsers();
      }),
      first(),
      catchError(err => {
        console.log(err);
        this.notifications.changeMessage('error', 'Something went wrong', 'Click to dismiss...');
        return of(null);
      })
    ).subscribe(refreshedUsers => {
      if (refreshedUsers) {
        this.dataSource.data = refreshedUsers;
        this.notifications.changeMessage('success', 'User deleted', 'Click to dismiss...');
      }
    })
  }

  promoteUser(user: User) {
    const accessLevel = (user.accessLevel == 3) ? 1 : 3;
    this.userService.promoteUser(user, accessLevel).pipe(
      filter(user => Boolean(user)),
      switchMap(result => {
        return this.userService.getAllUsers();
      }),
      first(),
      catchError(err => {
        console.log(err);
        this.notifications.changeMessage('error', 'Something went wrong', 'Click to dismiss...');
        return of(null);
      })
    ).subscribe(refreshedUsers => {
      if (refreshedUsers) {
        this.dataSource.data = refreshedUsers;
        this.notifications.changeMessage('success', 'User promoted', 'Click to dismiss...');
      }
    })
  }
}
