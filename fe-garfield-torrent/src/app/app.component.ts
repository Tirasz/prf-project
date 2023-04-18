import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, first, shareReplay } from 'rxjs';
import { User } from './shared/models/User';
import { AuthService } from './shared/services/Auth/auth.service';
import { NotificationService } from './shared/services/Notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routes: Array<string> = [];
  page = '';
  currentUser: Observable<User | null>;
  currentMessage: Observable<any>;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notifications: NotificationService
  ) {
    this.currentUser = this.authService.currentUser;
    this.currentMessage = this.notifications.currentMessage;
  }

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
    this.authService.logout().pipe(first()).subscribe(() => {
      this.router.navigateByUrl('/login');
    })
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
