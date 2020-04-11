import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly faUser = faUser;
  readonly faSignOutAlt = faSignOutAlt;
  private authSub: Subscription;
  private infoSub: Subscription;

  userInfo: string;
  isAuth = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authSub = this.authService.loggedIn$.subscribe(
      res => {
        this.isAuth = res;
    });
    this.infoSub = this.authService.userInfo$.subscribe(
      info => {
        this.userInfo = info;
    });
  }

  logOff(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.authService.getUserInfo().toPromise();
    }
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.infoSub.unsubscribe();
  }

}
