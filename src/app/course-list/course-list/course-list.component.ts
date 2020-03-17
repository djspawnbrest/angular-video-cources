import { Component, OnInit} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { FindPipe } from '../../shared/pipes/find.pipe';
import { CoursesDataService } from './../services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  entryComponents: [ConfirmDialogComponent]
})
export class CourseListComponent implements OnInit {
  readonly faPlus = faPlus;
  courseListsItems: CourseItem [];

  constructor(
    private findPipe: FindPipe,
    private coursesDataService: CoursesDataService,
    public dialog: MatDialog
    ) {
    this.courseListsItems = [];
  }

  onFind(findValue: string) {
    this.courseListsItems = this.findPipe.transform(this.coursesDataService.getAll(), findValue);
  }

  onDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    const item = this.coursesDataService.get(id);
    dialogConfig.data = {title: 'Delete?', message: `Do you really want to delete ${item.title}?`};
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesDataService.remove(id);
        this.courseListsItems = this.coursesDataService.getAll();
      }
    });
  }

  loadMoreCourses() {
    console.log('Load more courses');
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.courseListsItems = this.coursesDataService.getAll();
  }
}
