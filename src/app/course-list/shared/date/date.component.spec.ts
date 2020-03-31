import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DateComponent } from './date.component';
import { CourseItem } from '../../models/course-item';

const fakeCourseList = [
  new CourseItem(1, 'Video Cource 1', 'Spawn', 'description', 28, '2018-10-29', true),
  new CourseItem(2, 'Video Cource 2', 'Spawn', 'description', 30, '2018-5-30'),
];

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ DateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    component.model = fakeCourseList[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
