import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, catchError, first, of, takeUntil } from 'rxjs';
import { matchValues } from '../register/register.component';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/User/user.service';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { User } from '../../shared/models/User';
import { ResponseErrorToString } from '../../shared/models/Response';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private notifications: NotificationService
  ) { }

  onDestroy$: Subject<boolean> = new Subject<boolean>();
  isLoading = new BehaviorSubject(false);
  editUserForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.minLength(6), matchValues('password')])
  });
  currentUserId: string = '';


  ngOnInit(): void {
    this.authService.refreshCurrentUser();
    this.authService.currentUser.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(user => {
      this.currentUserId = user!.id!;
      this.editUserForm.controls['email'].setValue(user!.email);
      this.editUserForm.controls['username'].setValue(user!.username);
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true)
  }

  goBack() {
    this.location.back();
  }

  setUndefinedIfEmpty(control: FormControl<string | null>): string | undefined {
    const str = control.value;
    if (!str || str.length == 0)
      return undefined
    return str;
  }

  onSubmit() {
    const newUsername = this.setUndefinedIfEmpty(this.editUserForm.controls['username']);
    const newEmail = this.setUndefinedIfEmpty(this.editUserForm.controls['email']);
    const newPassword = this.setUndefinedIfEmpty(this.editUserForm.controls['password']);
    let editedUser: Partial<User> = { id: this.currentUserId }
    if (newUsername)
      editedUser.username = newUsername;
    if (newPassword)
      editedUser.password = newPassword;
    if (newEmail)
      editedUser.email = newEmail;
    this.isLoading.next(true);

    this.userService.updateUser(editedUser).pipe(
      catchError(err => {
        this.notifications.changeMessage('error', 'Profile update failed', ResponseErrorToString(err) + '\n Click to dismiss...',);
        return of(null);
      }),
      first()
    ).subscribe(result => {
      this.isLoading.next(false);
      if (result) {
        this.notifications.changeMessage('success', 'Profile edited', 'Click to dismiss...')
        this.router.navigate(['/browser']);
      }
    })
  }

  deleteUser() {
    this.userService.deleteUserFromId(this.currentUserId).pipe(
      catchError(err => {
        this.notifications.changeMessage('error', 'Profile deletion failed', 'Click to dismiss...',);
        return of(null);
      }),
      first()
    ).subscribe((deletedUser) => {
      this.authService.logout();
      this.notifications.changeMessage('success', 'We will miss you, ' + deletedUser!.username, 'Click to dismiss...');
      this.router.navigate(['/browser']);
      this.authService.refreshCurrentUser();
    })
  }
}
