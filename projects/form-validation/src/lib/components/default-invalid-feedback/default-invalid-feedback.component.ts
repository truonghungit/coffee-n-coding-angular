import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';

import { FormValidationConfig } from '../../models';
import { FORM_VALIDATION_CONFIGURATION } from '../../form-validation-token';
import { BaseInvalidFeedbackComponent } from '../base-invalid-feedback.component';

@Component({
  selector: 'invalid-feedback',
  template: `
    <div [ngClass]="errorMessageClass">
      <div *ngFor="let error of errors; trackBy: trackByFn">
        {{ error.message }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DefaultInvalidFeedbackComponent extends BaseInvalidFeedbackComponent {
  errorMessageClass = '';
  constructor(@Inject(FORM_VALIDATION_CONFIGURATION) public config: FormValidationConfig) {
    super();

    this.errorMessageClass = config.errorMessageClasses;
  }
}
