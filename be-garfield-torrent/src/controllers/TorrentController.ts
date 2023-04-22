import { Request, Response } from 'express';
import { Controller } from './Controller';
import Torrent from '../models/Torrent';

export class TorrentController implements Controller {

  create(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }

  getAll(req: Request, res: Response): void {
    Torrent.find().populate('owner')
      .then(torrents => res.status(200).json(torrents))
      .catch(err => {
        res.status(500).send(err);
      })
  }

  getById(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }

  update(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }

  delete(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }

}