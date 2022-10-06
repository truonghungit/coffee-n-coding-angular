# Angular Form Validation


## Features
- 🔥 Automatic form validation
- 💪 Built on top of [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
## Docs
- [Getting Started](./docs/getting-started.md)
- [Live Demo](https://stackblitz.com/edit/angular-ivy-gpgk6x?file=src/app/app.module.ts)

## Why use @eztek/ngx-validation

Declarative validation error messages for reactive forms. Typically you'd do something like this:

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
