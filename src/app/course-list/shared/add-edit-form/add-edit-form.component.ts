import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesDataService } from '../../services';
import { ICourseItem } from '../../models/course-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit, OnDestroy {
  private updateCourseSubscription: Subscription;
  @Input() model: ICourseItem;
  constructor(
    private coursesDataService: CoursesDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const self = this;
    if (this.model.id !== 0) {
      this.updateCourseSubscription = this.coursesDataService.update(this.model).subscribe( () => {
        self.router.navigate(['/courses']);
      });
    } else {
      this.updateCourseSubscription = this.coursesDataService.add(this.model).subscribe( () => {
        self.router.navigate(['/courses']);
      });
    }
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.updateCourseSubscription && this.updateCourseSubscription.unsubscribe();
  }

}
