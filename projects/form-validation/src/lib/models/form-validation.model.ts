import { Type } from '@angular/core';
import { ValidationErrors as NgValidationErrors } from '@angular/forms'

export type ValidationErrorMessage = {
  key: string;
  message: string;
  meta?: unknown;
}

export type ValidationErrors = NgValidationErrors & {
  [key: string]: {
    message: string;
    [key: string]: any;
  };
}

export enum ValidationTrigger {
  ValidateOnInit,
  ValidateOnChange,
  ValidateOnBlur,
  ValidateOnSubmit
}
