import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { IUser } from '../models/user.model';
import { User } from '../models/user';
import { Name } from '../models/name';
import { map } from 'rxjs/operators';

const BASE_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private loginSubscription: Subscription;
  constructor(private http: HttpClient) {
  }
  login(userLogin: string, pass: string): Observable<any> {
    const s = this.http.post<any>(`${BASE_URL}/login`, {login: userLogin, password: pass}, {
      headers: {
      'content-type': 'application/json',
      }
    });
    this.loginSubscription = s.subscribe( (data) => {
      localStorage.setItem('token', data.token);
    });
    return s;
  }

  logout(): void {
      localStorage.removeItem('user-login');
      localStorage.removeItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      return this.http.get<boolean>(`${BASE_URL}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: token
        }
      });
    } else {
      return of(false);
    }
  }

  getUserInfo(): Observable<IUser> {
    return this.http.post<any>(`${BASE_URL}/userinfo`, {token: this.getToken()}).pipe(map( (res) => {
      const data = res;
      const name = new Name (data.name.first, data.name.last);
      return new User(data.id, data.fakeToken, name, data.login, data.password);
    }));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
