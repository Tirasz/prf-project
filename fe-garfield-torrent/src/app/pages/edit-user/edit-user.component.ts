import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, first, of } from 'rxjs';
import { matchValues } from '../register/register.component';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/User/user.service';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { ResponseErrorToString, User } from '../../shared/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private notifications: NotificationService
  ) { }

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
    this.authService.currentUser.pipe(first()).subscribe(user => {
      this.currentUserId = user!.id!;
      this.editUserForm.controls['email'].setValue(user!.email);
      this.editUserForm.controls['username'].setValue(user!.username);
    })
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
        this.notifications.changeMessage('error', 'Registration failed', ResponseErrorToString(err) + '\n Click to dismiss...',);
        return of(null);
      }),
      first()
    ).subscribe(() => { this.isLoading.next(false) });
  }
}
