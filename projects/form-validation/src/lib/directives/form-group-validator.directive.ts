import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  Self,
  SkipSelf,
} from '@angular/core';
import { FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';
import { merge, NEVER, Observable, Subject, Subscription } from 'rxjs';
import { FORM_VALIDATION_CONFIGURATION } from '../form-validation-token';
import { FormValidationConfig } from '../models';
import { FormEvents } from '../models/form-events';
import { BaseValidatorDirective } from './base-validator.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formGroup],[formGroupName]',
  exportAs: 'formGroupValidator',
})
export class FormGroupValidatorDirective implements AfterViewInit, OnDestroy {
  @Input('skipValidate') _skipValidate = false;

  get parent(): Partial<FormGroupValidatorDirective> {
    return this.parentRef;
  }

  get skipValidation(): boolean {
    return (
      Boolean(this._skipValidate) ||
      (this.parent && this.parent.skipValidation) ||
      Boolean(this.config.skipValidation)
    );
  }

  get formGroup(): FormGroup {
    return (
      (this.formGroupDirective || ({} as FormGroupDirective)).form ||
      (this.formGroupName || ({} as FormGroupName)).control
    );
  }

  get events$(): Observable<FormEvents> {
    return merge(this._events$ || NEVER, this.parent?.events$ || NEVER);
  }

  private _events$ = new Subject<FormEvents>();
  private _subscriptions = new Subscription();

  constructor(
    private readonly elementRef: ElementRef,
    @Self()
    @Optional()
    private readonly formGroupName: FormGroupName,

    @Self()
    @Optional()
    private readonly formGroupDirective: FormGroupDirective,

    @SkipSelf()
    @Optional()
    public readonly parentRef: FormGroupValidatorDirective,

    @Inject(FORM_VALIDATION_CONFIGURATION)
    private readonly config: FormValidationConfig,
  ) {
  }

  ngAfterViewInit() {
    console.log('form group initialization', this.formGroup);
    this.handleFormValueChanges();
    this.handleFormStatusChanges();
    this.handleFormSubmit();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private handleFormSubmit() {
    if (!(this.elementRef.nativeElement instanceof HTMLFormElement)) {
      return;
    }

    this.elementRef.nativeElement.onsubmit = event => {
      if (this.formGroup.invalid) {
        // event.preventDefault();
      }
      this._events$.next({ name: 'FORM_SUBMIT', formGroup: this.formGroup });
    };
  }

  private handleFormStatusChanges(): void {
    this._subscriptions.add(this.formGroup.statusChanges.subscribe(() => {
      this._events$.next({ name: 'STATUS_CHANGES', formGroup: this.formGroup });
    }));
  }

  private handleFormValueChanges(): void {
    this._subscriptions.add(this.formGroup.valueChanges.subscribe(() => {
      this._events$.next({ name: 'VALUE_CHANGES', formGroup: this.formGroup });
    }));
  }
}
