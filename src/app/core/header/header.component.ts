import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import * as authSelectors from '../../auth/store/auth.selectors';
import * as authReducers from '../../auth/store/auth.reducers';
import * as authAction from '../../auth/store/auth.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly faUser = faUser;
  readonly faSignOutAlt = faSignOutAlt;

  userInfo$: Observable<string>;
  isAuth$: Observable<boolean>;

  constructor(private authStore: Store<authReducers.IState>) {
    this.isAuth$ = this.authStore.pipe(select(authSelectors.getLoggedIn));
    this.userInfo$ = this.authStore.pipe(select(authSelectors.getUser));
  }

  logOff(): void {
    this.authStore.dispatch(new authAction.Logout());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
