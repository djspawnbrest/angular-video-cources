import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { ICourseItem } from '../models/course-item.model';
import { CoursesDataService } from './../services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Subscription, Subject } from 'rxjs';
import { skip, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  entryComponents: [ConfirmDialogComponent]
})
export class CourseListComponent implements OnInit, OnDestroy {
  courseListsItems: CourseItem [];
  findValue = '';
  find = new Subject<string>();
  size: number;
  isLoadMore = false;
  dialogTitle: string;
  readonly faPlus = faPlus;
  private DEFAULT_SIZE = 5;
  private findSubscription: Subscription;

  constructor(
    private coursesDataService: CoursesDataService,
    public dialog: MatDialog
    ) {
    this.courseListsItems = [];
    this.findSubscription = this.find.asObservable().pipe(skip(3)).pipe(debounceTime(500)).subscribe((value) => {
      this.findValue = value;
      this.init();
    });
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
    this.isLoadMore = this.size < this.courseListsItems.length;
  }

  init() {
    this.coursesDataService.getWithParams(this.findValue).subscribe((res: ICourseItem[]) => {
      this.courseListsItems = res;
      this.size = this.DEFAULT_SIZE;
      this.isLoadMore = this.size < this.courseListsItems.length;
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.findSubscription.unsubscribe();
  }
}
