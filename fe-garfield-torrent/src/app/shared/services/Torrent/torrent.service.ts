import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Torrent, fromTorrentResponse } from '../../models/Torrent';
import { TorrentResponse, fromErrorResponse } from '../../models/Response';

const BASE_URL = '/api/torrents';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  constructor(
    private http: HttpClient
  ) { }


  createTorrent(torrent: Torrent): Observable<Torrent> {
    return this.http.post<TorrentResponse>(BASE_URL, torrent).pipe(
      map(torrent => fromTorrentResponse(torrent)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  getAllTorrents(): Observable<Torrent[]> {
    return this.http.get<TorrentResponse[]>(BASE_URL).pipe(
      map(torrents => torrents.map(torrents => fromTorrentResponse(torrents))),
      catchError(err => throwError(() => fromErrorResponse(err)))
    );
  }

  getTorrentById(torrentId: string): Observable<Torrent> {
    return this.http.get<TorrentResponse>(BASE_URL + '/' + torrentId).pipe(
      map(torrent => fromTorrentResponse(torrent)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  updateTorrent(torrent: Partial<Torrent>): Observable<Torrent> {
    if (torrent.id)
      return this.http.put<TorrentResponse>(BASE_URL + '/' + torrent.id, torrent).pipe(
        map(torrent => fromTorrentResponse(torrent)),
        catchError(err => throwError(() => fromErrorResponse(err)))
      );
    return throwError(() => 'Tried to update a torrent with no id!');
  }

  deleteTorrentFromId(torrentId: string): Observable<Torrent> {
    return this.http.delete<TorrentResponse>(BASE_URL + '/' + torrentId).pipe(
      map(torrent => fromTorrentResponse(torrent)),
      catchError(err => throwError(() => fromErrorResponse(err)))
    )
  }

  deleteTorrent(torrent: Torrent): Observable<Torrent> {
    if (torrent.id)
      return this.deleteTorrentFromId(torrent.id);
    return throwError(() => 'Tried to delete a user with no id!');
  }
}
