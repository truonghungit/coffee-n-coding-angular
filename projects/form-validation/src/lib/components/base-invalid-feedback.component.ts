import { TrackByFunction } from '@angular/core';
import { ValidationErrorMessage } from '../models';

export abstract class BaseInvalidFeedbackComponent {
  errors: Array<ValidationErrorMessage> = [];

  trackByFn: TrackByFunction<ValidationErrorMessage> = (_, item) => item.key;
}
