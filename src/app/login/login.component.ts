import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public httpclient: HttpClient, private router: Router) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);
  emailNameFormControl = new FormControl();

  matcher = {
    isErrorState: (control: FormControl) => {
      return control.invalid && control.touched;
    },
  };

  loginForm = new FormGroup({
    email: this.emailNameFormControl,
    password: this.passwordFormControl,
  });

  isDisabled() {

    return false

    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    // if (!email || !password) {
    //   return true;
    // }

    // if (password.length < 4) {
    //   return true;
    // }

    // return false;
  }

  login() {
    alert('Please wait while we verify your credentials...');
    console.log(this.loginForm.value);
    // this.router.navigate(['/home']); // re-route to login page

    const headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const obj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.httpclient
      .post('http://localhost:7600/login', obj, { headers: headers1 })
      .subscribe(
        (response) => {
          alert('Login successful!');
          console.log(response);
          this.router.navigate(['/home']); // handle successful login case
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Wrong credentials. Please try again.');
            this.router.navigate(['/home']); // re-route to login page
          } else {
            console.error(error);
          }
        }
      );
  }
}
