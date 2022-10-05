# Angular Form Validation

## Live Demo

[Stackblitz](https://stackblitz.com/edit/angular-ivy-gpgk6x?file=src/app/app.module.ts)

## Quick Start

### Install package
Installing with `npm`

```
npm i @eztek/ngx-validation --save
```

Installing with `yarn`

```
yarn add @eztek/ngx-validation
```

### Add `FormValidationModule` to your module
```
import { ReactiveFormsModule } from '@angular/forms';

import { FormValidationModule } from '@eztek/ngx-validation';
...

@NgModule({
  imports: [
    ...
    ReactiveFormsModule,
    FormValidationModule,
    ...
  ],
})
export class AppModule { }
```

> We need to import the `ReactiveFormsModule`;


### Define the form and validation

```
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormValidators } from '@eztek/ngx-validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup({
    firstName: new FormControl('', [
      FormValidators.required('First Name is required')
    ]),
    lastName: new FormControl('', [
      FormValidators.required('Last Name is required')
    ]),
    email: new FormControl('', [
      FormValidators.required('Email is required'),
      FormValidators.email('Email is invalid'),
    ]),
  });
  ...
}
```
> Providing an error message while configuring validation for control is not a bad idea.
```
<form (ngSubmit)="onSubmit()" [formGroup]="form">

  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" formControlName="email">
  </div>

  <div class="mb-3">
    <label for="firstName" class="form-label">First Name</label>
    <input type="text" class="form-control" id="firstName" formControlName="firstName">
  </div>

  <div class="mb-3">
    <label for="lastName" class="form-label">Last Name</label>
    <input type="text" class="input" id="lastName" formControlName="lastName">
  </div>

  <div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
```
> You don't have to do anymore. `FormValidation` will know how to display the error message to the user interface.
