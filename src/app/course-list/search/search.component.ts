import { Component, OnInit, Input, HostBinding } from '@angular/core';
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
  @Input() find;

  constructor() {}

  findCourse() {
    this.find.next(this.findValue);
  }

  ngOnInit() {}
}
