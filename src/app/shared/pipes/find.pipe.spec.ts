import { FindPipe } from './find.pipe';
import { CourseItem } from '../../course-list/models/course-item';
import { TestBed } from '@angular/core/testing';

describe('FindPipe', () => {
  let pipe: FindPipe;
  const firstCourseListItem = new CourseItem(1, 'abcd', 'Aliaksandr', 'My car won’t start.', 12, '2020-05-18');
  const secondCourseListItem =  new CourseItem(2, 'ihl', 'Sitnikau', 'It becomes dark very fast here.', 12, '2020-03-05');

  const courseListItems: CourseItem[] = [
    firstCourseListItem, secondCourseListItem
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPipe, CourseItem ]
    })
    .compileComponents();

    pipe = new FindPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should find', () => {
    let actual = pipe.transform(courseListItems, 'abc');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'ih');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should find by name', () => {
    let actual = pipe.transform(courseListItems, 'Ali');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'sitnikau');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should find by description', () => {
    let actual = pipe.transform(courseListItems, 'car');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'come');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should not find', () => {
    const actual = pipe.transform(courseListItems, 'zzzzz');
    expect(actual).toEqual([ ]);
  });
});
