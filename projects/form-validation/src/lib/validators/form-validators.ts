import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ValidationErrors } from '../models';

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isEmptyInputValue(value: unknown) {
  return value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}

function hasValidLength(value: string) {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}

export class FormValidators {
  static required(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmptyInputValue(control.value) ? {
        required: {
          message
        },
      } : null;
    }
  }

  static requiredTrue(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === true
        ? null
        : {
          requiredtrue: {
            requiredValue: true,
            actualValue: control.value,
            message
          }
        };
    }
  }

  static min(min: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value < min
        ? {
          min: { min: min, 'actual': control.value, message },
        }
        : null;
    };
  }

  static max(max: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value) && value > max
        ? { max: { max: max, actual: control.value, message } }
        : null;
    };
  }

  static range(range: [number, number], message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }

      let value: number = +control.value;
      return value >= range[0] && value <= range[1]
        ? null
        : { range: { actualValue: value, requiredValue: range, range: true, message } };
    };
  }

  static minLength(minLength: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
      }
      return control.value.length < minLength
        ? {
          minlength: {
            requiredLength: minLength,
            actualLength: control.value.length,
            message
          },
        }
        : null;
    };
  }

  static maxLength(maxLength: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return hasValidLength(control.value) && control.value.length > maxLength
        ? {
          maxlength: {
            requiredLength: maxLength,
            actualLength: control.value.length,
            message
          }
        }
        : null;
    };
  }

  static email(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      return EMAIL_REGEXP.test(control.value)
        ? null
        : { email: { message } };
    };
  }

  static equal = (value: any, message: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.errors && control.errors['required']) {
        return null;
      }

      return control.value === value
        ? null
        : { equal: { message } };
    };
  };

  static matchWith(controlNamesToCompare: Array<string>, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const parent = control.parent;

      if (!(parent instanceof FormGroup)) {
        return null;
      }

      const controlsToCompare = controlNamesToCompare
        .map(name => parent.controls[name])
        .filter(control => control);

      if (!control || !controlsToCompare || controlsToCompare.length === 0) {
        return null;
      }

      const controlValuesToCompare = controlsToCompare.map(control => control.value);

      if (isEmptyInputValue(control.value) || controlValuesToCompare.some(val => isEmptyInputValue(val))) {
        return null; // don't validate empty values to allow optional controls
      }

      if (controlValuesToCompare.every((val) => val === control.value)) {
        return null;
      }

      return {
        matchWith: {
          message
        }
      };
    }
  }
}
