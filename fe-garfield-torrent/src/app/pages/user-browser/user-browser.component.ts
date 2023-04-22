import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/User/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-user-browser',
  templateUrl: './user-browser.component.html',
  styleUrls: ['./user-browser.component.scss']
})
export class UserBrowserComponent implements AfterViewInit {

  columnNames: string[] = ['username', 'email', 'memberSince', 'accessLevel', 'actions']
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnInit(): void { }

  deleteUser(user: User) {
    console.log(user);
  }

  promoteUser(user: User) {
    console.log(user);
  }
}
