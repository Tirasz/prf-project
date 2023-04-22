import Torrent from '../models/Torrent';

export const authGuard = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  return res.status(401).send('Not authenticated!');
}

export const isAdminGuard = (req, res, next) => {
  if (req.user.accessLevel == 3)
    return next()
  return res.status(403).send('Not authorized!');
}

export const isSelf = (req, res, next) => {
  if (req.user.id === req.params.userId)
    return next()
  return res.status(403).send('Not authorized!');
}

export const isAdminOrSelf = (req, res, next) => {
  const user = req.user;
  if (user.accessLevel == 3 || user.id === req.params.userId)
    return next();
  return res.status(403).send('Not authorized!');
}

// Is the currently logged in user the owner of the torrent in the request
export const isOwnerGuard = (req, res, next) => {
  const torrentId = req.params.torrentId;
  if (!torrentId) return res.status(400).send('No torrent id provided!');
  Torrent.findById(torrentId)
    .then(torrent => {
      if (!torrent) return res.status(404).send('Torrent not found!');
      if (torrent.owner.toString() === req.user.id)
        return next();
      return res.status(403).send('Not authorized!');
    })
    .catch(err => {
      return res.status(500).send(err);
    })
}

export const isOwnerOrAdmin = (req, res, next) => {
  const torrentId = req.params.torrentId;
  if (!torrentId) return res.status(400).send('No torrent id provided!');
  if (req.user.accessLevel == 3)
    return next()
  return isOwnerGuard(req, res, next);
}
