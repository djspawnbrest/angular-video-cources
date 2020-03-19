import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesDataService } from '../../services';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit {
  @Input() model;
  constructor(
    private courseDataService: CoursesDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.model.id !== 0) {
      this.courseDataService.update(this.model);
    } else {
      this.courseDataService.add(this.model);
    }
    this.router.navigate(['courses']);
  }

}
