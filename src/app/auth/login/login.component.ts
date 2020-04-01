import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, LoadingService } from '../services';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription;
  model: IUser = new User(0, '', {firstName: '', lastName: ''}, '', '');
  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService) { }

  ngOnInit() {}

  login() {
    const self = this;
    self.loadingService.start();
    this.loginSubscription = this.authService.login(this.model.login, this.model.password).subscribe( (data) => {
      console.log('logged in successfully');
      self.loadingService.stop();
      self.router.navigate(['/courses']);
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
