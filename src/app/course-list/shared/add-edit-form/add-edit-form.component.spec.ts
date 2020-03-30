/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AddEditFormComponent } from './add-edit-form.component';
import { CoursesDataService } from '../../services/courses-data.service';
import { CourseItem } from '../../models/course-item';

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

describe('AddEditFormComponent', () => {
  let component: AddEditFormComponent;
  let fixture: ComponentFixture<AddEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AddEditFormComponent ],
      providers: [
        CoursesDataService,
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFormComponent);
    component = fixture.componentInstance;
    component.model = fakeCourseList[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
