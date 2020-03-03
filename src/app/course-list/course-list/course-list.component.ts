import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { FindPipe } from '../../pipes/find.pipe';
import { CoursesDataService } from '../../services/courses-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../core/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [ CoursesDataService ],
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

  onAddCourse() {
    console.log('Add new course event');
    this.coursesDataService.add(new CourseItem(4, 'Video Course 4', 'Ivan Ivanov', 'description', 94, '1583241848000' ));
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

  onUpdate(id: number) {
    console.log('Edit course:' + id);
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
