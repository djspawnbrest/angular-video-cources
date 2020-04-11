import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

const BASE_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  private _loggedIn$: Subject<boolean> = new Subject();
  get loggedIn$() {
    return this._loggedIn$.asObservable();
  }

  // tslint:disable-next-line:variable-name
  private _userInfo$: Subject<string> = new Subject();
  get userInfo$() {
    return this._userInfo$.asObservable();
  }

  login(userLogin: string, pass: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/login`, {login: userLogin, password: pass}, {
      headers: {
      'content-type': 'application/json',
      }
    }).pipe(switchMap((data) => {
      localStorage.setItem('token', data.token);
      return of(data);
    }));
  }

  logout(): void {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('token');
      this._loggedIn$.next(false);
  }

  isAuthenticated() {
    const token = this.getToken();
    if (token) {
      return this.http.get<boolean>(`${BASE_URL}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: token
        }
      }).pipe(tap(res => this._loggedIn$.next(res)));
    } else {
      return of(false);
    }
  }

  getUserInfo(): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/userinfo`, {token: this.getToken()})
    .pipe(switchMap( (info) => {
      this._userInfo$.next(`${info.name.first} ${info.name.last}`);
      return of(info);
    }));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  ngOnDestroy() {
  }
}
