import { TestBed } from '@angular/core/testing';

import { CoursesDataService } from './courses-data.service';
import { ICourseItem } from './../models/course-item.model';
import { CourseItem } from './../models/course-item';

describe('CoursesDataService', () => {
  let service: CoursesDataService;
  let cousrsesList: ICourseItem[];
  let countOfCourses: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesDataService]
    });
    service = TestBed.inject(CoursesDataService);
    cousrsesList = service.getAll();
    countOfCourses = cousrsesList.length;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be getAll', () => {
    const courses = service.getAll();

    expect(courses).toEqual(cousrsesList);
    expect(courses.length).toBe(cousrsesList.length);
  });

  it('should be get course', () => {
    const course = service.get(2);

    expect(course).toEqual(cousrsesList[1]);
  });

  it('shiuld be add course', () => {
    const addCourse = new CourseItem(0, 'Video Course 4', 'Spawn', 'description', 111, '2020-04-15', true );
    service.add(addCourse);
    const getAllCourses = service.getAll();
    addCourse.id = getAllCourses.length;

    expect(addCourse).toEqual(getAllCourses[getAllCourses.length - 1]);
    expect(addCourse.id).toEqual(getAllCourses[getAllCourses.length - 1].id);
  });

  it('should be update course', () => {
    const getCourseToUpdate = service.get(2);
    getCourseToUpdate.description = 'test';
    getCourseToUpdate.topRated = true;
    service.update(getCourseToUpdate);
    const getUpdatedCourse = service.get(2);

    expect(getCourseToUpdate).toEqual(getUpdatedCourse);
  });

  it('should be remove course', () => {
    service.remove(1);
    const newCoursesList = service.getAll();
    const coursesCount = newCoursesList.length;

    expect(coursesCount).not.toEqual(countOfCourses);
    expect(coursesCount).toEqual(countOfCourses - 1);
    expect(newCoursesList).not.toEqual(cousrsesList);
  });

});
