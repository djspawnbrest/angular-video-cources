import { Component, OnInit, Input } from '@angular/core';
import { ICourseItem } from '../../models/course-item.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() model: ICourseItem;
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getDate() {
    return this.datePipe.transform(this.model.date, 'yyyy-MM-dd');
  }

  setDate(date: any) {
    this.model.date = new Date(date).toISOString();
  }

}
