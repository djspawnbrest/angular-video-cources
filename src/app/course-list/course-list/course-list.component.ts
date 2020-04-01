import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { ICourseItem } from '../models/course-item.model';
import { FindPipe } from '../../shared/pipes/find.pipe';
import { CoursesDataService } from './../services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  entryComponents: [ConfirmDialogComponent]
})
export class CourseListComponent implements OnInit, OnDestroy {
  readonly faPlus = faPlus;
  courseListsItems: CourseItem [];
  private size = 5;
  private removeSubscription: Subscription;
  private getWithParamsSubscription: Subscription;
  findValue = '';

  constructor(
    private findPipe: FindPipe,
    private coursesDataService: CoursesDataService,
    public dialog: MatDialog
    ) {
    this.courseListsItems = [];
  }

  onFind(findValue: string) {
    this.findValue = findValue;
    this.init();
  }

  onDelete(id: number) {
    const self = this;
    const dialogConfig = new MatDialogConfig();
    const item = this.coursesDataService.get(id);
    dialogConfig.data = {title: 'Delete?', message: `Do you really want to delete?`}; // ${item.title}
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeSubscription = this.coursesDataService.remove(id).subscribe( () => {
          self.init();
        });
      }
    });
  }

  loadMoreCourses() {
    this.size += 5;
    this.init();
  }

  init() {
    this.coursesDataService.getWithParams(this.findValue, this.size.toString()).subscribe((res: ICourseItem[]) => {
      this.courseListsItems = res;
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.removeSubscription && this.removeSubscription.unsubscribe();
    // tslint:disable-next-line:no-unused-expression
    this.getWithParamsSubscription && this.getWithParamsSubscription.unsubscribe();
  }
}
