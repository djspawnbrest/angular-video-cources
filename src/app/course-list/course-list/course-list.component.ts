import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { ICourseItem } from '../models/course-item.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Subscription, Subject, Observable } from 'rxjs';
import { skip, debounceTime } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as courseListSelectors from '../store/course-list.selectors';
import * as courseListActions from '../store/course-list.actions';
import { CourseState } from '../store/course-list.state';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  entryComponents: [ConfirmDialogComponent]
})
export class CourseListComponent implements OnInit, OnDestroy {
  courseListsItems$: Observable<CourseItem[]>;
  courseCount$: Observable<number>;
  findValue = '';
  find = new Subject<string>();
  size: number;
  isLoadMore = false;
  dialogTitle: string;
  readonly faPlus = faPlus;
  private DEFAULT_SIZE = 5;
  private findSubscription: Subscription;

  constructor(
    private courseStore: Store<CourseState>,
    public dialog: MatDialog
    ) {
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
        this.courseStore.dispatch(new courseListActions.RemoveCourse(course.id));
      }
    });
  }

  loadMoreCourses() {
    this.size += 5;
  }

  init() {
    this.courseStore.dispatch(new courseListActions.Load({textFragment: this.findValue}));
    this.size = this.DEFAULT_SIZE;
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.init();
    this.courseListsItems$ = this.courseStore.pipe(select(courseListSelectors.selectAllCourses));
    this.courseCount$ = this.courseStore.pipe(select(courseListSelectors.coursesCount));
  }

  ngOnDestroy() {
    this.findSubscription.unsubscribe();
  }
}
