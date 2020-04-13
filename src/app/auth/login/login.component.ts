import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services';
import { LoadingService } from '../../shared/services';
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
  private authUnsubscriber: Subscription;
  model: IUser = new User(0, '', {firstName: '', lastName: ''}, '', '');
  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.stop();
  }

  login() {
    this.loadingService.start();
    this.authUnsubscriber = this.authService.login(this.model.login, this.model.password).subscribe( () => {
      this.authService.getUserInfo().toPromise();
      this.loadingService.stop();
      this.router.navigate(['/courses']);
    });
  }

  ngOnDestroy() {
    this.authUnsubscriber.unsubscribe();
  }
}
