import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListItemComponent } from './course-list-item.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { By } from '@angular/platform-browser';
import { FindPipe, DurationPipe } from '../../shared/pipes';
import { CreationDateDirective } from '../../shared/directives';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

class ActivatedRouteStub {}

const firstCourseItem: CourseItem = new CourseItem(1, 'title', 'author', 'description', 13, '10.10.2018', true);
const secondCourseItem: CourseItem = new CourseItem(1, 'title', 'author', 'description', 13, '10.10.2018');
@Component ({
  template: `
    <app-course-list-item *ngFor="let item of courseListsItems; trackBy: trackByFn" [courseListItem]="item" (delete)="onDelete($event)">
    </app-course-list-item>`
})
class TestHostComponent {
  public courseListsItems: CourseItem[] = [
    firstCourseItem,
    secondCourseItem
  ];
  public deletedElement: number;
  public onDelete(id: number) {
    this.deletedElement = id;
  }
}

describe('CourseListItemComponent', () => {
  let hostComponent: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule ],
      providers: [ FindPipe, DurationPipe,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }, ],
      declarations: [ CreationDateDirective, FindPipe, DurationPipe, CourseListItemComponent, TestHostComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    const courseElements = fixture.debugElement.queryAll(By.css('.course'));
    expect(courseElements.length).toBe(2);
    const firstCourseElement = courseElements[0];
    const secondCourseElement = courseElements[1];
    const firstCourseDate =  new Date(firstCourseItem.creationDate);
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(firstCourseDate);

    const deleteButton = firstCourseElement.query(By.css('.delete'));
    expect(deleteButton).toBeTruthy();
    expect(firstCourseElement.query(By.css('.title')).nativeElement.textContent).toBe(` ${firstCourseItem.title.toUpperCase()} `);
    expect(firstCourseElement.query(By.css('.description')).nativeElement.textContent).toBe(firstCourseItem.description);
    expect(firstCourseElement.query(By.css('.author')).nativeElement.textContent).toBe(` Author: ${firstCourseItem.author} `);
    expect(firstCourseElement.query(By.css('.duration')).nativeElement.textContent).toBe(`  ${firstCourseItem.duration}min `);
    expect(firstCourseElement.query(By.css('.date')).nativeElement.textContent).toBe(` ${da} ${mo} ${ye} `);
    expect(firstCourseElement.classes.rated).toBeTruthy();

    expect(secondCourseElement.classes.rated).toBeFalsy();

  });

  it('should delete course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(hostComponent.deletedElement).toBe(firstCourseItem.id);
  });
});
