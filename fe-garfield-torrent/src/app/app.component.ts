import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routes: Array<string> = [];
  page = '';
  currentUser = null;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
  }

  logout(_?: boolean) {
    console.log('You pressed logout gj')
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
}
