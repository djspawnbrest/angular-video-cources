import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseListItemComponent } from './edit-course-list-item.component';

describe('EditCourseListItemComponent', () => {
  let component: EditCourseListItemComponent;
  let fixture: ComponentFixture<EditCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourseListItemComponent ]
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
