import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  readonly faSearch = faSearch;
  @HostBinding('class') class = 'input-group mb-3';
  @Input() findValue = '';
  @Output() find = new EventEmitter<string>();

  constructor() { }

  findCourse() {
    console.log('Find: ' + this.findValue);
    this.find.emit(this.findValue);
  }

  ngOnInit() {
  }

}
