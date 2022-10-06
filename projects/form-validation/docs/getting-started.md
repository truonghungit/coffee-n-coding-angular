# Quick Start

Follow these steps to get started with **Ngx Validation**. Also check out our [demos](https://formly.dev/examples) for further examples.

> Actually we only install package then add the `FormValidationModule` to your module

### 1. Install **@eztek/ngx-validation** packages:

Installing with `npm`

```
npm i @eztek/ngx-validation --save
```

Installing with `yarn`

```
yarn add @eztek/ngx-validation
```

### 2. Add `FormValidationModule` to your module `AppModule`

```patch
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
+ import { FormValidationModule } from '@eztek/ngx-validation';

+ import { ExampleComponent } from './example.component';

@NgModule({
  imports: [
    BrowserModule
    ReactiveFormsModule,
    ...
+   FormValidationModule,
  ],
  declarations: [
    ...
+   ExampleComponent
  ]
  ...
})
export class AppModule { }
```

We can use the `forRoot()` or `forFeature` method to pass extra config

```
FormValidationModule.forRoot({
  ...
})
```
```
FormValidationModule.forFeature({
  ...
})
```

### 3. Define the form and validation

*example.component.ts*
```
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
  ...

  constructor(private formBuilder: FormBuilder) { }
}
```

*example.component.html*
```
<form (ngSubmit)="onSubmit()" [formGroup]="form">

  <div>
    <label for="email">Email address</label>
    <input type="email" id="email" formControlName="email">
  </div>

  <div>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" formControlName="firstName">
  </div>

  <div>
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" formControlName="lastName">
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```
> You don't have to do anymore. `FormValidation` will know how to display the error message to the user interface.
