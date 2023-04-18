import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { NotificationService } from '../../shared/services/Notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = new BehaviorSubject(false);
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6))
  })

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (!(email && password))
      return

    this.isLoading.next(true);
    this.authService.login({
      username: email,
      password: password
    }).pipe(first()).subscribe(result => {
      this.isLoading.next(false);
      if (result)
        this.router.navigateByUrl('/create-torrent');
      else
        this.notification.changeMessage('error', 'Incorrect user credentials!', 'Click to dismiss..')
    })



  }

  goBack() {
    this.location.back();
  }
}
