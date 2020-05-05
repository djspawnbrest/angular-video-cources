import { Component, HostListener, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Authors } from '../../models/authors.model';

import { AuthorState } from '../../store/author.state';
import * as authorsAction from '../../store/author.actions';
import * as authorsReducers from '../../store/author.reducers';

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
  suggestedAuthors$: Observable<Authors[]>;
  expand = false;

  onChange;
  onTouched;
  authors: Authors[];
  touched = false;

  constructor(private authorStore: Store<AuthorState>) {
    this.authors = [];
    this.authorStore.dispatch(new authorsAction.Load({textFragment: ''}));

    this.suggestedAuthors$ = this.authorStore.pipe(select(authorsReducers.selectAllAuthors));
  }

  get value() {
    return this.authors;
  }

  set value(value: Authors[]) {
    this.authors = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  @ViewChild('authorType') authorVal: ElementRef;

  @HostListener('click') click() {
    this.touched = true;
    if (this.onTouched) {
      this.onTouched();
    }
  }

  @HostListener('window:click', ['$event']) clk(event: any) {
    if (
      event.target.className === 'author-res-item' ||
      event.target.className === 'author-trigger' ||
      event.target.className === 'author-trigger-ico' ) {}
    else if (this.expand) {
      this.expand = false;
      this.authorVal.nativeElement.value = '';
    }
  }

  writeValue(obj: Authors[]): void {
    this.authors = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  trigger() {
    this.expand = !this.expand;
  }

  remove(id: string) {
    this.authors = this.authors.filter(author => author.id.toString() !== id.toString());
    this.onChange(this.authors);

  }

  add(author: Authors) {
    if (!this.authors.some(a => a.id === author.id)) {
      this.authors = Object.assign([], this.authors);
      this.authors.push({id: author.id, name: author.name.split(' ')[0], lastName: author.name.split(' ')[1]});
      this.onChange(this.authors);
    }
  }

  onKey(value: string) {
    this.expand = value ? true : false;
    this.authorStore.dispatch(new authorsAction.Load({textFragment: value}));
  }
}
