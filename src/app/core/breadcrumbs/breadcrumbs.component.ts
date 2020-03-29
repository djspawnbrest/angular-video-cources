import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumbs.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})

export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: BreadCrumb[];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public cd: ChangeDetectorRef
              ) {
                this.cd.detach();
              }

  ngOnInit() {
    this.router.events.subscribe( event => {
      if (event.constructor.name === 'NavigationEnd') {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        this.cd.detectChanges();
      }
    });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
    ): BreadCrumb[] {
      const label = route.routeConfig ? route.routeConfig.data.breadcrumb : '';
      const path = route.routeConfig && route.routeConfig.path ? route.routeConfig.path : '';

      const nextUrl = `${url}${path}/`;
      const breadcrumb = {
          label,
          url: nextUrl,
          isLink: true
      };

      let newBreadcrumbs;
      if (label !== '') {
        newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
      } else {
        newBreadcrumbs = breadcrumbs;
      }
      if (route.firstChild) {
          return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
      }
      newBreadcrumbs[newBreadcrumbs.length - 1].isLink = false;

      return newBreadcrumbs;
  }
}
