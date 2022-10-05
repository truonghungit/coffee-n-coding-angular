import { FormGroup } from "@angular/forms";

type FormEventName = 'FORM_INIT' | 'VALUE_CHANGES' | 'STATUS_CHANGES' | 'FORM_SUBMIT';

export interface FormEvents {
  name: FormEventName;
  formGroup: FormGroup;
}
