import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Input() currentUser?: null; // TODO 
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void { }

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean) {
    if (logout === true) {
      this.onLogout.emit(logout)
    }
    this.onCloseSidenav.emit(true);
  }
}