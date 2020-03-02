import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
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
