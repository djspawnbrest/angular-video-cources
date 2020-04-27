import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../models/user.model';
import { User, Authenticate } from '../models/user';
import * as authReducers from '../store/auth.reducers';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: IUser = new User(0, '', {firstName: '', lastName: ''}, '', '');
  constructor(private authStore: Store<authReducers.IState>,) { }

  ngOnInit() {
  }

  login() {
    this.authStore.dispatch(new authActions.Login(new Authenticate(this.model.login, this.model.password)));
  }

  ngOnDestroy() {
  }
}
