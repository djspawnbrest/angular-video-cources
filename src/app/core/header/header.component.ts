import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import * as authSelectors from '../../auth/store/auth.selectors';
import * as authReducers from '../../auth/store/auth.reducers';
import * as authAction from '../../auth/store/auth.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly faUser = faUser;
  readonly faSignOutAlt = faSignOutAlt;

  userInfo$: Observable<string>;
  isAuth$: Observable<boolean>;

  selectedLanguage: string;

  constructor(
    private authStore: Store<authReducers.IState>,
    public translateService: TranslateService
    ) {
    this.isAuth$ = this.authStore.pipe(select(authSelectors.getLoggedIn));
    this.userInfo$ = this.authStore.pipe(select(authSelectors.getUser));
  }

  logOff(): void {
    this.authStore.dispatch(new authAction.Logout());
  }

  ngOnInit(): void {
    // initialize translate service
    this.translateService.addLangs(environment.locales);
    if (localStorage.getItem('lang')) {
      this.selectedLanguage = localStorage.getItem('lang');
    } else {
      this.selectedLanguage = environment.defaultLocale;
      localStorage.setItem('lang', this.selectedLanguage);
    }
    this.translateService.use(this.selectedLanguage);
  }

  changeLocale(lang) {
    this.selectedLanguage = lang;
    localStorage.setItem('lang', lang);
    this.translateService.use(this.selectedLanguage);
  }

}
