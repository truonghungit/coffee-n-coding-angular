import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyErrorFeedbackComponent } from './validation/my-error-feedback/my-error-feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from './translate.pipe';
import { NestedGroupComponent } from './nested-group/nested-group.component';
import { FormValidationModule } from 'projects/form-validation/src/public-api';
// import { FormValidationModule } from 'form-validation';

@NgModule({
  declarations: [
    AppComponent,
    MyErrorFeedbackComponent,
    TranslatePipe,
    NestedGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatFormFieldModule,
    MatInputModule,

    ReactiveFormsModule,
    FormValidationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
