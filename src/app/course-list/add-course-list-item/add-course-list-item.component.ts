import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-course-list-item',
  templateUrl: './add-course-list-item.component.html',
  styleUrls: ['./add-course-list-item.component.css']
})
export class AddCourseListItemComponent implements OnInit {
  course: FormGroup = this.fb.group({
    id: 0,
    name: [ '', [ Validators.required, Validators.maxLength(50), Validators.minLength(2) ]],
    authors: [ [], Validators.required ],
    date: [ '', Validators.required ],
    length: [ '', Validators.required ],
    description: [ '', [ Validators.required, Validators.maxLength(500)] ]
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

}
