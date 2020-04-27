import { Component, forwardRef, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => DateComponent ),
    multi: true
  },{
    provide: NG_VALIDATORS,
    useExisting: forwardRef( () => DateComponent ),
    multi: true
  }]
})
export class DateComponent implements ControlValueAccessor, Validator {
  @ViewChild('date') dateInput: ElementRef;

  onChange;
  onTouched;
  private _value: string;
  parseError = false;
  regexp = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{4})?[0-9]{4}$/;

  get value() {
    return this.datePipe.transform(this._value, 'MM/dd/yyyy');
  }
  set value(value: string) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  @HostListener('click') click() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  constructor(private renderer: Renderer2, private datePipe: DatePipe) { }

  validate(c: AbstractControl): ValidationErrors {
  return (!this.parseError) ? null : {
        error: {
            valid: false
        },
    };
  }

  onKey(value: string) {
    const m = value.match(this.regexp);
    if (m) {
      this._value = new Date(value).toISOString();
      this.onChange(this._value);
      this.parseError = false;
      this.changeState(false);
    } else {
      this.parseError = true;
      this.changeState(true);
    }
  }

  private changeState(isInvalid: boolean) {
    let removeClass = 'ng-invalid';
    let addClass = 'ng-valid';
    if (isInvalid) {
       removeClass = 'ng-valid';
       addClass = 'ng-invalid';
    }
    this.renderer.removeClass(this.dateInput.nativeElement, removeClass);
    this.renderer.addClass(this.dateInput.nativeElement, addClass);
  }

  // ngOnInit(): void {
  // }

  // getDate() {
  //   return this.datePipe.transform(this.model.date, 'yyyy-MM-dd');
  // }

  // setDate(date: any) {
  //   this.model.date = new Date(date).toISOString();
  // }

}
