import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly faUser = faUser;
  readonly faSignOutAlt = faSignOutAlt;

  constructor(private router: Router, private authService: AuthService) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logOff(): void {
    const userInfo = this.authService.getUserInfo();
    this.authService.logout();
    console.log(`User "${userInfo}" logoff.`);
    this.router.navigate(['login']);
  }

  getUserInfo(): string {
    return this.authService.getUserInfo();
  }

  ngOnInit(): void {
  }

}
