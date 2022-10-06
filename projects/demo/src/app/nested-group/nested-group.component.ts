import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'projects/form-validation/src/public-api';

@Component({
  selector: 'app-nested-group',
  templateUrl: './nested-group.component.html',
  styleUrls: ['./nested-group.component.scss']
})
export class NestedGroupComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      FormValidators.required('Email is required'),
      FormValidators.email('Email is invalid'),
    ]),
    password: new FormControl('', [
      FormValidators.required('Password is required'),
      FormValidators.minLength(6, 'Password should have at least 6 characters'),
    ]),
    confirmPassword: new FormControl('', [
      FormValidators.required('Confirm Password is required')
    ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
