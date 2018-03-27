import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from "@angular/forms";
import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";

export function maxLengthValidator(num: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
      let strLength: any;
      if (control.value) {
       strLength = control.value.replace(/[^\x00-\xff]/g, "**").length;
      }
      const forbidden = strLength > num ? true : false;
        return forbidden ? {"length": {value: control.value}} : null;
  };
}

@Directive({
  selector: "[appForbiddenName]",
  providers: [{provide: NG_VALIDATORS, useExisting: MaxLengthValidatorDirective, multi: true}]
})
export class MaxLengthValidatorDirective implements Validator {
  @Input() length: number;

  validate(control: AbstractControl): {[key: string]: any} {
    return this.length ? maxLengthValidator(this.length)(control) : null;
  }
}
