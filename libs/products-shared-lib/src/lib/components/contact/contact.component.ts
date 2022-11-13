/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { timer } from 'rxjs';
import { EmailService } from '../../services/email.service';



@Component({
  selector: 'pinkbits-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit {
  //Global vars
  form: FormGroup;
  isSubmitted = false;
  display = false;
  displayModal: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private email: EmailService
  ) { }

  ngOnInit(): void {
    this._initFeedbackForm ()
  }

  //Functions

  private _initFeedbackForm () {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      comments: ['', Validators.required]
    })
  }

  submitFeedback() {
    this.isSubmitted = true;
    //console.log(this.feedbackForm['firstName'].value)

    const user = {
      firstName: this.feedbackForm['firstName'].value,
      lastName: this.feedbackForm['lastName'].value,
      email: this.feedbackForm['email'].value,
      phone: this.feedbackForm['phone'].value,
      comments: this.feedbackForm['comments'].value
    }

    const url = environment.apiURL;
    this.email.sendEmail(url + 'sendemail', user).subscribe(
      data => {
        let res:any = data;
        console.log("Email Sent Successfully")
      }, err => {
        console.log(err)
      }
    )

    this.showModalDialog();
    
  }

  showModalDialog() {
    this.displayModal = true;
  }

  resetForm () {
    this.displayModal = false;
    location.reload()
  }

  get feedbackForm () {
    return this.form.controls;
  }

}
