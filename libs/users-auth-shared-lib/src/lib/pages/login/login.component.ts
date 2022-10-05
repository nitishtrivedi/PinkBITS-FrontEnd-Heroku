/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */


import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'pinkbits-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})


export class LoginComponent implements OnInit {
//Global Vars
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Incorrect Credentials. Please check E-Mail/ Password and try again';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }



  ngOnInit(): void {

    this._initLoginForm ();

  }

//Functions

  private _initLoginForm () {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid){
      return;
    }

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
      (user) => {
        this.authError = false;

        //Call localStorage Service
        this.localStorageService.setToken(user.token)

        //Protect ADMIN Panel. Main Authentication mechanism
        this.router.navigate(['/'])

      }, (error: HttpErrorResponse) => {
        this.authError = true;

        if(error.status !== 400) {
          this.authMessage = 'Server Error. Please try again later'
        }
      }
      )
  }

  get loginForm () {
    return this.loginFormGroup.controls;
  }




}
