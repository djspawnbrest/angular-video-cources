import { Component, OnInit, Input } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  faSearch = faSearch;
  faPlus = faPlus;
  @Input() findValue = '';

  constructor() { }

  findCourse() {
    console.log('Find: ' + this.findValue);
  }

  onAddCourse() {
    console.log('Add new course event');
  }

  ngOnInit() {
  }

}
