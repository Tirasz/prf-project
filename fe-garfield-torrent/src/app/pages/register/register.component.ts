import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newUser = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };
    console.log('TRIED CREATING USER: ', newUser);
    this.isLoading.next(true);
  }

  goBack() {
    this.location.back();
  }
}
