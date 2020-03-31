import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseListItemComponent } from './edit-course-list-item.component';
import { CourseItem } from '../models/course-item';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const fakeCourseList = [
  new CourseItem(1, 'Video Cource 1', 'Spawn', 'description', 28, '2018-10-29', true),
  new CourseItem(2, 'Video Cource 2', 'Spawn', 'description', 30, '2018-5-30'),
];

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const mockActivatedRouter = {
  snapshot: { data: fakeCourseList[0] }
};

describe('EditCourseListItemComponent', () => {
  let component: EditCourseListItemComponent;
  let fixture: ComponentFixture<EditCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditCourseListItemComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
