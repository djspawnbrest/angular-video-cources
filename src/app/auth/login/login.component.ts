import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Authenticate } from '../models/user';
import * as authReducers from '../store/auth.reducers';
import * as authActions from '../store/auth.actions';
import * as authSelectors from '../store/auth.selectors';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  error$ = this.authStore.pipe(select(authSelectors.getLoginError));
  errorSubscription: Subscription;

  user = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authStore: Store<authReducers.IState>,
    private fb: FormBuilder
    ) {
      this.errorSubscription = this.error$.subscribe(() => {
        this.user.controls.login.setErrors({incorrect: true});
        this.user.controls.password.setErrors({incorrect: true});
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    this.authStore.dispatch(
      new authActions.Login(
        new Authenticate(this.user.value.login, this.user.value.password)
      )
    );
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
