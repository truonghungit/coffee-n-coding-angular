import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseInvalidFeedbackComponent } from '../base-invalid-feedback.component';

@Component({
  selector: 'invalid-feedback',
  template: `
    <div *ngFor="let error of errors; trackBy: trackByFn">
      {{ error.message }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AngularMaterialInvalidFeedbackComponent extends BaseInvalidFeedbackComponent {
}
