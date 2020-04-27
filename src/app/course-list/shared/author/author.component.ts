import { Component, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorComponent),
    multi: true
  }]
})
export class AuthorComponent implements ControlValueAccessor {
  onChange;
  onTouched;
  private _value: string;

  get value() {
    return this._value;
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

  constructor() { }

  onKey(value: any) {
    this._value = value;
    this.onChange(this._value);
  }

  // getUsersNames() {
  //   const names = this.model.authors.map(user => user.name);
  //   return names.join(';');
  // }

  // updateAuthorsModel(authorsString: string) {
  //   this.model.authors =  authorsString.split(';').map(nm => {
  //     return {
  //       id: 0,
  //       name: nm,
  //       lastName: ''
  //     };
  //   });
  // }

}
