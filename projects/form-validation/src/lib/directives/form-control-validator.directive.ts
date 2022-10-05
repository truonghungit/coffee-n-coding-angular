import { AfterViewInit, ApplicationRef, ComponentRef, createComponent, Directive, ElementRef, EmbeddedViewRef, Inject, Injector, Input, OnDestroy, Optional, Renderer2, SkipSelf, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FormEvents } from '../models/form-events';
import {
  BaseInvalidFeedbackComponent,
  DefaultInvalidFeedbackComponent,
  AngularMaterialInvalidFeedbackComponent,
  BootstrapInvalidFeedbackComponent,
} from '../components';
import { FORM_VALIDATION_CONFIGURATION } from '../form-validation-token';
import { FormGroupValidatorDirective } from './form-group-validator.directive';
import { FormValidationConfig, SupportedFrameworks, ValidationErrorMessage, ValidationErrors } from '../models';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControl],[formControlName]',
  exportAs: 'formControlValidator',
})
export class FormControlValidatorDirective implements AfterViewInit, OnDestroy {

  @Input('skipValidate') _skipValidate = false;

  @Input('validateOnInit') _validateOnInit = false;

  get parent(): Partial<FormGroupValidatorDirective> {
    return this.parentRef;
  }

  get skipValidation(): boolean {
    return (
      Boolean(this._skipValidate) ||
      Boolean(this.parent.skipValidation) ||
      Boolean(this.config.skipValidation)
    );
  }

  get validateOnInit(): boolean {
    return (
      this._validateOnInit ||
      this.config.validateOnInit
    );
  }

  get framework(): SupportedFrameworks {
    if (this.config.framework === SupportedFrameworks.None) {
      return this.autoDetectUIFramework;
    }

    return this.config.framework;
  }

  get invalidFeedbackTemplate() {
    if (this.config.invalidFeedbackTemplate) {
      return this.config.invalidFeedbackTemplate;
    }

    switch (this.framework) {
      case SupportedFrameworks.Bootstrap:
        return BootstrapInvalidFeedbackComponent;

      case SupportedFrameworks.AngularMaterial:
        return AngularMaterialInvalidFeedbackComponent;

      case SupportedFrameworks.None:
        return DefaultInvalidFeedbackComponent;

      default:
        return DefaultInvalidFeedbackComponent;
    }
  }

  private invalidFeedbackComponentRef: ComponentRef<BaseInvalidFeedbackComponent> | EmbeddedViewRef<any> | null = null;
  private subscriptions = new Subscription();
  private autoDetectUIFramework: SupportedFrameworks = SupportedFrameworks.None;
  private cached = '';

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly control: NgControl,
    private readonly elementRef: ElementRef,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly renderer: Renderer2,

    @Inject(FORM_VALIDATION_CONFIGURATION)
    private readonly config: FormValidationConfig,

    @Optional()
    public parentRef: FormGroupValidatorDirective,

    @Optional() private formGroupDirective: FormGroupDirective,
  ) {
  }

  ngAfterViewInit() {
    this.detectFramework();
    let cached: string;

    const events$ = (this.parent.events$ as Observable<FormEvents>);

    this.subscriptions.add(events$.pipe(
      filter(() => !this.skipValidation),
      map(() => {
        return this.formatErrors(this.control.errors as ValidationErrors);
      })
    ).subscribe(errors => {
      if (cached === JSON.stringify(errors)) {
        return;
      }

      this.updateFeedback(errors);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private detectFramework() {
    const classList = (this.elementRef.nativeElement as HTMLElement).classList;
    if (classList.contains('form-control') || classList.contains('form-select') || classList.contains('form-check-input')) {
      this.autoDetectUIFramework = SupportedFrameworks.Bootstrap;
      return;
    }

    if (classList.contains('mat-input-element') || classList.contains('mat-select')) {
      this.autoDetectUIFramework = SupportedFrameworks.AngularMaterial;
      return;
    }
  }

  private updateFeedback(errors: Array<ValidationErrorMessage>) {
    this.removeInvalidFeedbackMessage();

    switch (this.framework) {
      case 'bootstrap':
        this.updateFeedbackUseBootstrap(errors);
        break;
      case 'angular-material':
        this.updateFeedbackUseAngularMaterial(errors);
        break;

      default:
        this.updateFeedbackAsDefault(errors);
        break;
    }
  }

  private formatErrors(errors: ValidationErrors): Array<ValidationErrorMessage> {
    return Object.keys(errors || {}).map(key => {
      return {
        key,
        message: errors[key].message || '',
        meta: errors[key]
      }
    })
  }

  private shouldShowInvalidFeedbackMessages(errors: Array<ValidationErrorMessage>) {
    return errors.length && (this.control.dirty || this.formGroupDirective.submitted);
  }

  private removeInvalidFeedbackMessage(): void {
    if (this.invalidFeedbackComponentRef) {
      this.invalidFeedbackComponentRef.destroy();
      this.invalidFeedbackComponentRef = null;
    }
  }

  private updateFeedbackAsDefault(errors: Array<ValidationErrorMessage>) {
    if (this.shouldShowInvalidFeedbackMessages(errors)) {
      this.viewContainerRef.clear();

      this.invalidFeedbackComponentRef = this.viewContainerRef.createComponent(this.invalidFeedbackTemplate);

      if (this.invalidFeedbackComponentRef instanceof ComponentRef && this.invalidFeedbackComponentRef.instance) {
        this.invalidFeedbackComponentRef.instance.errors = errors;
      }
      this.cached = JSON.stringify(errors);
    } else {
      this.cached = '';
    }
  }

  private updateFeedbackUseBootstrap(errors: Array<ValidationErrorMessage>) {
    if (this.shouldShowInvalidFeedbackMessages(errors)) {
      this.viewContainerRef.clear();

      this.invalidFeedbackComponentRef = this.viewContainerRef.createComponent(this.invalidFeedbackTemplate);

      if (this.invalidFeedbackComponentRef instanceof ComponentRef && this.invalidFeedbackComponentRef.instance) {
        this.invalidFeedbackComponentRef.instance.errors = errors;
      }

      this.renderer.removeClass(this.elementRef.nativeElement, 'is-valid');
      this.renderer.addClass(this.elementRef.nativeElement, 'is-invalid');

      this.cached = JSON.stringify(errors);
    } else {
      this.cached = '';
      this.renderer.removeClass(this.elementRef.nativeElement, 'is-valid');
      this.renderer.removeClass(this.elementRef.nativeElement, 'is-invalid');

      if (errors.length === 0 && this.control.valid && (this.control.dirty || this.formGroupDirective.submitted)) {
        this.renderer.addClass(this.elementRef.nativeElement, 'is-valid');
      }
    }
  }

  private updateFeedbackUseAngularMaterial(errors: Array<ValidationErrorMessage>) {
    const matFormFieldSelector = 'mat-form-field.mat-form-field';
    const matSubscriptWrapperSelector = '.mat-form-field-subscript-wrapper';

    if (this.shouldShowInvalidFeedbackMessages(errors)) {

      const matFormField = (this.elementRef.nativeElement as HTMLElement).closest(matFormFieldSelector);
      if (!matFormField) {
        console.warn(`Cannot find the mat-form-field element, make sure use the ${(this.elementRef.nativeElement.nodeName as string).toLowerCase()} element inside <mat-form-field>`);
        return;
      }

      const matSubscriptWrapper = matFormField.querySelector(matSubscriptWrapperSelector);

      if (!matSubscriptWrapper) {
        console.warn('Cannot find target element');
        return;
      }
      const hostElement = document.createElement('mat-error');
      hostElement.classList.add('mat-error');
      matSubscriptWrapper.appendChild(hostElement);

      document.createElement('mat-error');
      this.invalidFeedbackComponentRef = createComponent(this.invalidFeedbackTemplate, {
        environmentInjector: this.applicationRef.injector,
        hostElement: hostElement
      });

      if (this.invalidFeedbackComponentRef instanceof ComponentRef && this.invalidFeedbackComponentRef.instance) {
        this.applicationRef.attachView(this.invalidFeedbackComponentRef.hostView);
        this.invalidFeedbackComponentRef.instance.errors = errors;
      }

      this.cached = JSON.stringify(errors);
    } else {
      this.cached = '';
    }
  }
}




