import { TestBed, inject } from '@angular/core/testing';

import { CoursesDataService } from '../../course-list/services';
import { CourseItem } from '../../course-list/models/course-item';

describe('CoursesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CoursesDataService ]
    });
  });

  it('should be created', inject([CoursesDataService], (service: CoursesDataService) => {
    expect(service).toBeTruthy();
    expect(service.getAll().length).toEqual(3);
  }));

  describe('get', () => {
    it('should return course when exist', inject([CoursesDataService], (service: CoursesDataService) => {
      const firstCourse = service.get(1);
      const secondCourse = service.get(2);
      const thirdCourse = service.get(3);

      expect(firstCourse).toBeTruthy();
      expect(secondCourse).toBeTruthy();
      expect(thirdCourse).toBeTruthy();
    }));
    it('should return undefiened when not exist', inject([CoursesDataService], (service: CoursesDataService) => {
      const course = service.get(4);

      expect(course).toBeUndefined();
    }));
  });

  describe('add', () => {
    it('should be added', inject([CoursesDataService], (service: CoursesDataService) => {
      const addedCourseId = 4;
      const course = new CourseItem(0, 'title', 'author', 'description');

      service.add(course);

      const addedCourse = service.get(addedCourseId);
      expect(addedCourse).toEqual(course);
    }));

    it('should not be added when course id exist', inject([CoursesDataService], (service: CoursesDataService) => {
      const addedCourseId = 3;
      const course = new CourseItem(addedCourseId, 'title', 'author', 'description');

      service.add(course);

      const addedCourse = service.get(addedCourseId);
      expect(addedCourse).not.toBe(course);
    }));
  });

  describe('update', () => {
    it('should be updated', inject([CoursesDataService], (service: CoursesDataService) => {
      const updatedCourseId = 3;
      const updatedCourse = service.get(updatedCourseId);

      service.update(updatedCourse);

      expect(service.get(updatedCourseId)).toEqual(updatedCourse);
    }));

    it('should not be updated when course not exist', inject([CoursesDataService], (service: CoursesDataService) => {
      const updatedCourseId = 4;
      const updatedCourse = new CourseItem(updatedCourseId, 'title', 'author', 'description');

      service.update(updatedCourse);

      expect(service.get(updatedCourseId)).toBeUndefined();
    }));
  });

  describe('remove', () => {
    it('should be removed', inject([CoursesDataService], (service: CoursesDataService) => {
      const removedCourseId = 3;

      service.remove(removedCourseId);

      expect(service.get(removedCourseId)).toBeUndefined();
    }));

    it('should not be removed when course not exist', inject([CoursesDataService], (service: CoursesDataService) => {
      const removedCourseId = 4;

      service.remove(removedCourseId);

      expect(service.get(removedCourseId)).toBeUndefined();
    }));
  });
});
