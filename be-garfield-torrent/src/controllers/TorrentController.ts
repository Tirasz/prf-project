import { Request, Response } from 'express';
import { Controller } from './Controller';
import Torrent from '../models/Torrent';
import { validateObjectId } from '../utils/validators';


export class TorrentController implements Controller {

  create(req: Request, res: Response): void {
    // authGuard makes sure that the request is authenticated
    const newTorrent = new Torrent({
      ...req.body,
      owner: req.user!.id!
    });

    newTorrent.save()
      .then(torrent => res.status(200).json(torrent.populate('owner')))
      .catch(err => {
        if (err.name == "ValidationError")
          res.status(400).send(err);
        else
          res.status(500).send(err);
      })
  }

  getAll(req: Request, res: Response): void {
    Torrent.find().populate('owner')
      .then(torrents => res.status(200).json(torrents))
      .catch(err => {
        res.status(500).send(err);
      })
  }

  getById(req: Request, res: Response): void {
    const validateResult = validateObjectId(req.params.torrentId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }

    Torrent.findById(validateResult.objectId).populate('owner')
      .then(torrent => {
        if (!torrent) {
          res.status(404).send('Torrent not found');
          return;
        }
        res.status(200).json(torrent);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  update(req: Request, res: Response): void {
    const validateResult = validateObjectId(req.params.torrentId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }


    Torrent.findByIdAndUpdate(validateResult.objectId, req.body, { runValidators: true })
      .then(updatedTorrent => {
        if (!updatedTorrent) {
          res.status(404).send('Torrent not found');
          return;
        }
        res.status(200).json(updatedTorrent);
      })
      .catch(err => {
        if (err.name === "ValidationError" || err.name === "Bad request")
          res.status(400).send(err);
        else
          res.status(500).send(err);
      });
  }

  delete(req: Request, res: Response): void {
    const validateResult = validateObjectId(req.params.torrentId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }

    Torrent.findByIdAndDelete(validateResult.objectId)
      .then(deletedTorrent => {
        if (!deletedTorrent) {
          res.status(404).send('Torrent not found');
          return;
        }
        res.status(200).send(deletedTorrent);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

}