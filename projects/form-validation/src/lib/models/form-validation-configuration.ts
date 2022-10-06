import { Type } from '@angular/core';
import { BaseInvalidFeedbackComponent } from '../components';

export const enum SupportedFrameworks {
  Bootstrap = 'bootstrap',
  AngularMaterial = 'angular-material',
  None = 'none'
}

export interface FormValidationConfig {
  invalidFeedbackTemplate?: Type<BaseInvalidFeedbackComponent>;
  defaultErrorMessages: {[key: string]: string};
  invalidClasses: string;
  skipValidation: boolean;
  targetSelector: string;
  validateOnInit: boolean;
  errorMessageClasses: string;
  framework: SupportedFrameworks;
}
