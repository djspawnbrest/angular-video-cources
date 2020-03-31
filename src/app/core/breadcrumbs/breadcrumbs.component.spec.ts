import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

class RouterStub {
  public url = '/';
  ne = new NavigationEnd(0, '/auth', '/login');
  constructor() { }
  events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
  navigateByUrl(url: any) {
    this.url = url;
  }
}
class ActivatedRouteStub {
  root = {
    routeConfig: {
      data: {
        breadcrumb: 'login'
      }
    }
  };
}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ChangeDetectorRef,
        { provide: Router, useClass: RouterStub }
      ],
       schemas: [ NO_ERRORS_SCHEMA ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
