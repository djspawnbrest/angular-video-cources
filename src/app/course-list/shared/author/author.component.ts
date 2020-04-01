import { Component, OnInit, Input } from '@angular/core';
import { ICourseItem } from '../../models/course-item.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @Input() model: ICourseItem;
  constructor() { }

  ngOnInit(): void {
  }

}
