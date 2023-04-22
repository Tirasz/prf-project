import { TorrentResponse } from './Response';
import { User } from './User';

export enum TorrentCategory {
  MOVIE = "MOVIE",
  SOFTWARE = "SOFTWARE",
  XXX = "XXX",
  EBOOK = "EBOOK"
}

export interface Torrent {
  id?: string,
  owner: User,
  created?: Date,
  title: string,
  description: string,
  category: TorrentCategory,
  seeders: number,
  leechers: number
};


export function fromResponseObject(respObj: TorrentResponse): Torrent {
  return {
    id: respObj._id,
    owner: respObj.owner,
    created: respObj.created,
    title: respObj.title,
    description: respObj.description,
    category: TorrentCategory[respObj.category],
    seeders: respObj.seeders,
    leechers: respObj.leechers
  }
}
