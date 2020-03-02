import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @HostBinding('class') class = 'input-group mb-3';
  faSearch = faSearch;
  @Input() findValue = '';

  constructor() { }

  findCourse() {
    console.log('Find: ' + this.findValue);
  }

  ngOnInit() {
  }

}
