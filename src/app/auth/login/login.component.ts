import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['courses']);
    }
  }

  login() {
    this.authService.login(this.model.username);
    console.log(`User "${this.model.username}" logged in successfully`);
    this.router.navigate(['/courses']);
  }

}
