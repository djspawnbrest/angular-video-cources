import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CourseItem } from '../models/course-item';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { CreationDateDirective } from '../../shared/directives';
import { FindPipe } from '../../shared/pipes';
import { CoursesDataService } from '../services';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-list-item',
  template: `<div class="course"></div>`
})
class MockCourseListItemComponent {
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter();
}

let fakeCourseList = [
  new CourseItem(1, 'Video Cource 1', 'Spawn', 'description', 28, '2018-10-29', true),
  new CourseItem(2, 'Video Cource 2', 'Spawn', 'description', 30, '2018-5-30'),
];

class MockCourseDataService extends CoursesDataService {
  getAll() {
    return fakeCourseList;
  }
  remove(id: number): boolean {
    if (this.get(id)) {
      fakeCourseList = fakeCourseList.filter( (c) => {
        return c.id !== id;
      });
      return true;
    }
    return false;
  }
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  const countOfCourses = fakeCourseList.length;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        FindPipe,
        CoursesDataService,
        { provide: MatDialog, useValue: {open: (): void => undefined} }
      ],
      declarations: [
        CreationDateDirective,
        MockCourseListItemComponent,
        CourseListComponent,
        ConfirmDialogComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).overrideComponent(CourseListComponent, {
      set: {
        providers: [
          { provide: CoursesDataService, useClass: MockCourseDataService },
        ],
      }})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more courses', () => {
    const spyLoadMore = spyOn(component, 'loadMoreCourses');
    const loadMoreButton = fixture.debugElement.query(By.css('button.loadmore'));
    loadMoreButton.triggerEventHandler('click', null);

    expect(spyLoadMore).toHaveBeenCalled();
  });

  it('should call FindPipe tranform function', () => {
    const findValue = 'Find';
    const spyFindPipe = spyOn(FindPipe.prototype, 'transform');
    component.onFind(findValue);
    expect(spyFindPipe).toHaveBeenCalledWith(fakeCourseList, findValue);
  });

  it('should emit deleteCourse', () => {
    const deletedCourseId = 1;
    const ref = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as any);
    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(ref).toHaveBeenCalled();
    expect(countOfCourses - 1).toBe(1);
  });

  it('should emit deleteCourse, not delete if user not confirm', () => {
    const deletedCourseId = 2;
    const ref = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(false)} as any);
    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(ref).toHaveBeenCalled();
    expect(countOfCourses).toBe(2);
  });

});
