import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesDataService } from '../../services';
import { ICourseItem } from '../../models/course-item.model';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit, OnDestroy {
  @Input() model: ICourseItem;
  constructor(
    private coursesDataService: CoursesDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.model.id !== 0 ) {
      this.coursesDataService.update(this.model).subscribe( () => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.coursesDataService.add(this.model).subscribe( () => {
        this.router.navigate(['/courses']);
      });
    }
  }

  ngOnDestroy() {
  }

}
