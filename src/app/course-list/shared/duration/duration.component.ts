import { Component, OnInit, Input } from '@angular/core';
import { ICourseItem } from '../../models/course-item.model';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  @Input() model: ICourseItem;
  length = '';

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: string) {
    this.length = value;
  }

}
