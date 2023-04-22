import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { UserService } from '../../shared/services/User/user.service';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { ResponseErrorToString } from '../../shared/models/Response';

export function matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.get(matchTo)?.value
      ? null
      : { isMatching: false };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = new BehaviorSubject(false);
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    rePassword: new FormControl('', [Validators.minLength(6), Validators.required, matchValues('password')])
  });

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private notifications: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;
    if (!(email && username && password))
      return

    const newUser: User = { email, username, password, accessLevel: 1 };
    this.isLoading.next(true);
    this.userService.createUser(newUser).pipe(
      catchError(err => {
        this.notifications.changeMessage('error', 'Registration failed', ResponseErrorToString(err) + '\n Click to dismiss...',);
        return of(null);
      }),
      switchMap(result => {
        if (result)
          return this.authService.login({ username: result.email, password })
        return of(false)
      })
    ).subscribe(authResult => {
      this.isLoading.next(false);
      if (authResult) {
        this.router.navigateByUrl('/create-torrent')
      }
    })


  }

  goBack() {
    this.location.back();
  }
}
