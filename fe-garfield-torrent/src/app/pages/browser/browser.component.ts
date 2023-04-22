import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TorrentService } from '../../shared/services/Torrent/torrent.service';
import { MatTableDataSource } from '@angular/material/table';
import { Torrent } from '../../shared/models/Torrent';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit, AfterViewInit {

  columnNames: string[] = ['title', 'category', 'created', 'owner', 'seeders', 'leechers']
  dataSource = new MatTableDataSource<Torrent>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private torrentService: TorrentService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.torrentService.getAllTorrents().subscribe(torrents => {
      this.dataSource.data = torrents;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnInit(): void { }

  onRowClicked(row: any) {
    this.router.navigate(['/torrent', row.id]);
  }

}
