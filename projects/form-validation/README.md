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

## Why use @eztek/ngx-validation

Declarative validation error messages for reactive forms.

Typically you'd do something like this:

#### Without **@eztek/ngx-validation**
```
<form [formGroup]="form">
  <div>
    <label>Email Address</label>
    <input type="text" formControlName="email" />

    <div *ngIf="form.get('email').invalid && (form.get('email').dirty || form.submitted))">
      <div ngIf="form.get('email').hasError('required')">Email is required</div>
      <div ngIf="form.get('email').hasError('email')">Field is invalid</div>
    </div>
  </div>

  <div>
    <label>Password</label>
    <input type="text" formControlName="password" />
    <div *ngIf="form.get('password').invalid && (form.get('password').dirty || form.submitted))">
      <div ngIf="form.get('password').hasError('required')">Password is required</div>
      <div ngIf="form.get('password').hasError('minlength')">Password should have at least 6 characters</div>
    </div>
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```
#### With **@eztek/ngx-validation**, we don't need to do any things, that help cleans up your templates
```
<form [formGroup]="form">
  <div>
    <label>Email Address</label>
    <input type="text" formControlName="email" />
  </div>

  <div>
    <label>Password</label>
    <input type="text" formControlName="password" />
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="text" formControlName="confirmPassword" />
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```
