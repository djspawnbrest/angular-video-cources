import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services';
import { IUser } from '../../auth/models/user.model';
import { IName } from 'src/app/auth/models/name.model';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly faUser = faUser;
  readonly faSignOutAlt = faSignOutAlt;

  private getUserInfoSubscription: Subscription;
  private authSubscription: Subscription;
  userInfo: Observable<IUser>;
  firstLast: string;
  isAuth = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.getUserInfo().subscribe( (user: IUser) => {
      this.firstLast = `${user.name.firstName} ${user.name.lastName}`;
    });
    this.authSubscription = this.authService.isAuthenticated().subscribe((isAuth) => this.isAuth = isAuth);
  }

  logOff(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getUserInfoSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
