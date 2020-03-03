import { FindPipe } from './find.pipe';
import { CourseItem } from '../course-list/models/course-item';
import { TestBed } from '../../../node_modules/@angular/core/testing';

describe('FindPipe', () => {
  let pipe: FindPipe;
  const firstCourseListItem = new CourseItem(1, 'abcd', 'Aliaksandr', 'efg', 12, "1577873421000");
  const secondCourseListItem =  new CourseItem(2, 'ihl', 'Sitnikau', 'yzd', 12, "1577873421000");

  const courseListItems = [
    firstCourseListItem, secondCourseListItem
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPipe, CourseItem ]
    })
    .compileComponents();
  });

  it('create an instance', () => {
    pipe = new FindPipe();
    expect(pipe).toBeTruthy();
  });

  it('should find by title', () => {
    let actual = pipe.transform(courseListItems, 'abcd');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'h');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should find by name', () => {
    let actual = pipe.transform(courseListItems, 'Alikasandr');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'Sitnikau');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should find by description', () => {
    let actual = pipe.transform(courseListItems, 'efg');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'yzd');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should not find', () => {
    const actual = pipe.transform(courseListItems, 'zzzzz');
    expect(actual).toEqual([  ]);
  });
});import { from } from 'rxjs';

