import { Component, forwardRef, ViewChild, ElementRef, HostListener, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationComponent),
    multi: true
  },
  {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationComponent),
      multi: true,
  }
  ]
})
export class DurationComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @ViewChild('duration') duratuionInput: ElementRef;

  onChange;
  onTouched;
  parseError = false;
  touched = false;
  mached = false;
  private _value: number;
  formatDuration;

  get value() {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  @HostListener('click') click() {
    this.parseError = true;
    this.touched = true;
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

  constructor(private renderer: Renderer2) { }

  onKey(value: any) {
    const n = Number(value);
    if (n) {
      this.mached = true;
      this.parseError = false;
      this._value = n;
      this.onChange(this._value);
      this.changeState(false);
    } else {
      this.mached = false;
      this.parseError = true;
      this._value = undefined;
      this.onChange(undefined);
      this.changeState(true);
    }
  }

  ngAfterViewInit(){
    const n = Number(this._value);
    if (this._value) {
      if (n) {
        this.changeState(false);
      } else {
        this.changeState(true);
      }
    }
  }

  private changeState(isInvalid: boolean) {
    let removeClass = 'ng-invalid';
    let addClass = 'ng-valid';
    if (isInvalid) {
       removeClass = 'ng-valid';
       addClass = 'ng-invalid';
    }
    this.renderer.removeClass(this.duratuionInput.nativeElement, removeClass);
    this.renderer.addClass(this.duratuionInput.nativeElement, addClass);
  }

  validate(c: AbstractControl): ValidationErrors {
    return (!this.parseError) ? null : {
          error: {
              valid: false
          },
    };
  }

}
