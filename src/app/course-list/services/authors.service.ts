import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services';
import { Authors } from '../models/authors.model';

const BASE_URL = 'http://localhost:3004/authors';

@Injectable()
export class AuthorsService {
  private headers = new HttpHeaders({
    'content-type': 'application/json',
  });
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers.set('Authorization', this.authService.getToken());
  }

  getAll(): Observable<Authors[]> {
      return this.http.get<Authors[]>(`${BASE_URL}`);
  }

  get(id: number): Observable<Authors> {
    return this.http.get<Authors>(`${BASE_URL}/${id}`);
  }

  public getWithParams(textFragment: string): Observable<Authors[]> {
    return this.http.get<Authors[]>(`${BASE_URL}`, {params: {textFragment}});
  }
}
