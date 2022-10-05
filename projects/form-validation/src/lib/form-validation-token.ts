import { InjectionToken } from '@angular/core';
import { FormValidationConfig } from './models';

export const FORM_VALIDATION_CONFIGURATION = new InjectionToken<FormValidationConfig>('Form validation configuration');
