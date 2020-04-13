import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../shared/services';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading = false;
  private loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading().pipe(debounceTime(500)).subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
