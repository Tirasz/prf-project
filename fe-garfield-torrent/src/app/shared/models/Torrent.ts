import { TorrentResponse } from './Response';
import { User, fromUserResponse } from './User';

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


const deletedUser: User = {
  id: '<DELETED USER>',
  email: '<DELETED USER>',
  username: '<DELETED USER>',
  password: '<DELETED USER>',
  accessLevel: 0
}

export function fromTorrentResponse(respObj: TorrentResponse): Torrent {
  return {
    id: respObj._id,
    owner: respObj.owner ? fromUserResponse(respObj.owner) : deletedUser,
    created: respObj.created,
    title: respObj.title,
    description: respObj.description,
    category: TorrentCategory[respObj.category],
    seeders: respObj.seeders,
    leechers: respObj.leechers
  }
}
