import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as authReducers from '../../auth/store/auth.reducers';
import * as authSelectors from '../../auth/store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authStore: Store<authReducers.IState>, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authStore.pipe(select(authSelectors.getLoggedIn)).pipe(catchError(() => this.router.navigate(['/login']))).pipe(map(e => {
      if (e) {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
    }));
  }
}
