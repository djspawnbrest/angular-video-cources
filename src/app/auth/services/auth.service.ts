import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Authenticate } from '../models/user';

const BASE_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  constructor(private http: HttpClient) {
  }

  login(auth: Authenticate): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/login`, {login: auth.login, password: auth.password}, {
      headers: {
      'content-type': 'application/json',
      }
    }).pipe(switchMap((data) => {
      localStorage.setItem('token', data.token);
      return of(data);
    }));
  }

  getUserInfo(): Observable<User> {
    if (this.getToken()) {
      return this.http.post<any>(`${BASE_URL}/userinfo`, {token: this.getToken()})
      .pipe(switchMap( (info) => {
        const user = {
          id: info.id,
          token: info.fakeToken,
          name: {
            firstName: info.name.first,
            lastName: info.name.last
          },
          login: info.login,
          password: info.password
        };
        return of(user);
      }));
    } else {
      return of(null)
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  ngOnDestroy() {
  }
}
