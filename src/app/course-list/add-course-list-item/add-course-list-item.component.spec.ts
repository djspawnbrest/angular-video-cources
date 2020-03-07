import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseListItemComponent } from './add-course-list-item.component';

describe('AddCourseListItemComponent', () => {
  let component: AddCourseListItemComponent;
  let fixture: ComponentFixture<AddCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
