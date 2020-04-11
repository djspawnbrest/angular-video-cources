import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { ICourseItem } from '../models/course-item.model';
import { CoursesDataService } from './../services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

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
  findValue = '';
  dialogTitle: string;

  constructor(
    private coursesDataService: CoursesDataService,
    public dialog: MatDialog
    ) {
    this.courseListsItems = [];
  }

  onFind(findValue: string) {
    this.findValue = findValue;
    this.init();
  }

  onDelete(course: ICourseItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'Delete?', message: `Do you really want to delete "${course.name}"?`};
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesDataService.remove(course.id).subscribe( () => {
          this.init();
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
  }
}
