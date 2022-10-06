import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AngularMaterialInvalidFeedbackComponent,
  BootstrapInvalidFeedbackComponent,
  DefaultInvalidFeedbackComponent
} from './components';
import {
  FormGroupValidatorDirective,
  FormControlValidatorDirective,
} from './directives';

import { FORM_VALIDATION_CONFIGURATION } from './form-validation-token';
import { FormValidationConfig, SupportedFrameworks } from './models';
import { defaultErrorMessages } from './constants/default-error-messages';

export const defaultFormValidationConfig: FormValidationConfig = {
  invalidClasses: '',
  skipValidation: false,
  targetSelector: '',
  validateOnInit: false,
  errorMessageClasses: 'invalid-feedback-messages',
  defaultErrorMessages: defaultErrorMessages,
  framework: SupportedFrameworks.None
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DefaultInvalidFeedbackComponent,
    BootstrapInvalidFeedbackComponent,
    AngularMaterialInvalidFeedbackComponent,
    FormGroupValidatorDirective,
    FormControlValidatorDirective,
  ],
  exports: [
    FormGroupValidatorDirective,
    FormControlValidatorDirective,
  ],
  providers: [
    {
      provide: FORM_VALIDATION_CONFIGURATION,
      useValue: defaultFormValidationConfig
    }
  ]
})
export class FormValidationModule {
  static forRoot(config: Partial<FormValidationConfig>): ModuleWithProviders<FormValidationModule> {
    const formValidationConfig = { ...defaultFormValidationConfig, ...config };

    return {
      ngModule: FormValidationModule,
      providers: [
        {
          provide: FORM_VALIDATION_CONFIGURATION,
          useValue: formValidationConfig
        }
      ],
    };
  }

  static forFeature(config: Partial<FormValidationConfig>): ModuleWithProviders<FormValidationModule> {
    const formValidationConfig = { ...defaultFormValidationConfig, ...config };

    return {
      ngModule: FormValidationModule,
      providers: [
        {
          provide: FORM_VALIDATION_CONFIGURATION,
          useValue: formValidationConfig
        }
      ],
    };
  }
}
