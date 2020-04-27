import { Component } from '@angular/core';
import { AuthService } from './auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'angular-video-cources';

  get isAuth() {
    return localStorage.getItem('token');
  }
}
