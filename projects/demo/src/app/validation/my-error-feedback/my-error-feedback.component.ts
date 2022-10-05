import { Component, OnInit } from '@angular/core';
import { BaseInvalidFeedbackComponent } from 'projects/form-validation/src/public-api';

@Component({
  selector: 'app-my-error-feedback',
  templateUrl: './my-error-feedback.component.html',
  styleUrls: ['./my-error-feedback.component.scss']
})
export class MyErrorFeedbackComponent extends BaseInvalidFeedbackComponent {
}
