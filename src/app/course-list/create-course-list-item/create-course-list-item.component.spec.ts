import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseListItemComponent } from './create-course-list-item.component';

describe('CreateCourseListItemComponent', () => {
  let component: CreateCourseListItemComponent;
  let fixture: ComponentFixture<CreateCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
