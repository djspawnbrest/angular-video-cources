import { CreationDateDirective } from './creation-date.directive';
import { Component, DebugElement } from '../../../node_modules/@angular/core';
import { CourseItem } from '../course-list/models/course-item';
import { TestBed, ComponentFixture } from '../../../node_modules/@angular/core/testing';
import { By } from '../../../node_modules/@angular/platform-browser';
import { ICourseItem } from '../course-list/models/course-item.model';

@Component({
  template: `<a href="#" [appCreationDate]="courseItems[0]"></a>
            <a href="#" [appCreationDate]="courseItems[1]"></a>
            <a href="#" [appCreationDate]="courseItems[2]"></a>`
})

class TestHostComponent {
  courseItems: ICourseItem[];

  constructor() {
    const currDate = new Date();
    const cDate = currDate.getTime().toString();
    const oldCourseDate = new Date(currDate.getFullYear(), currDate.getMonth(),  currDate.getDate() - 15).getTime().toString();
    const futureCourseDate = new Date(currDate.getFullYear(), currDate.getMonth(),  currDate.getDate() + 3).getTime().toString();
    this.courseItems = [
      new CourseItem(1, 'title', 'Spawn', 'description', 30, cDate),
      new CourseItem(1, 'title', 'Spawn', 'description', 30, oldCourseDate),
      new CourseItem(1, 'title', 'Spawn', 'description', 30, futureCourseDate)
    ];
  }
}

describe('CreationDateDirective', () => {
  let hostComponent: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CreationDateDirective ],
      declarations: [ CreationDateDirective, TestHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(CreationDateDirective));
    expect(des.length).toBe(3);
  });


  it('should highlight rgba(0, 165, 114, 0.5) when course is fresh', () => {
    expect(des[0].nativeElement.style.borderColor).toBe('rgba(0, 165, 114, 0.5)');
  });

  it('should not highlight when course is old', () => {
    expect(des[1].nativeElement.style.borderColor).not.toBe('rgba(87, 160, 211, 0.5)');
    expect(des[1].nativeElement.style.borderColor).not.toBe('rgba(0, 165, 114, 0.5)');
  });

  it('should highlight gba(87, 160, 211, 0.5) when course is upcomming', () => {
    expect(des[2].nativeElement.style.borderColor).toBe('rgba(87, 160, 211, 0.5)');
  });
});
