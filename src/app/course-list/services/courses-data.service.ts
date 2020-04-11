import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { ICourseItem } from './../models/course-item.model';
import { AuthService } from '../../auth/services';

const BASE_URL = 'http://localhost:3004/courses';

@Injectable()
export class CoursesDataService {
  private headers = new HttpHeaders({
    'content-type': 'application/json'
  });

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers.set('Authorization', this.authService.getToken());
  }

  public getWithParams(textFragment: string, count: string = ''): Observable<ICourseItem[]> {
    return this.http.get<ICourseItem[]>(`${BASE_URL}`, {params: {textFragment, count}});
  }

  getAll(): Observable<ICourseItem[]> {
    return this.http.get<ICourseItem[]>(`${BASE_URL}`);
  }

  get(id: number): Observable<ICourseItem> {
    return this.http.get<ICourseItem>(`${BASE_URL}/${id}`);
  }

  add(course: ICourseItem): Observable<ICourseItem> {
    return this.http.post<ICourseItem>(`${BASE_URL}`, course, {headers: this.headers});
  }

  update(course: ICourseItem): Observable<ICourseItem> {
    return this.http.put<ICourseItem>(`${BASE_URL}/${course.id}`, course, {headers: this.headers});
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

}
