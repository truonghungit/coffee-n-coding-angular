import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from 'form-validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = this.formBuilder.group({
    firstName: ['', [FormValidators.required('First Name is required')]],
    lastName: ['', [FormValidators.required('Last Name is required')]],
    email: [
      '',
      [
        FormValidators.required('Email is required'),
        FormValidators.email('Email is invalid'),
      ],
    ],
    phoneNumber: [''],
    address: this.formBuilder.group({
      street: [''],
      city: ['', [FormValidators.required('City is required')]],
      state: ['', [FormValidators.required('State is required')]],
      zipcode: ['', [FormValidators.required('Zipcode is required')]],
    }),
  });

  constructor(private formBuilder: FormBuilder) {
  }

  onSubmit() {
    console.log("on submit", this.form)
  }

}
