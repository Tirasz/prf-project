
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
  if (req.user._id === req.params.userId)
    return next()
  return res.status(403).send('Not authorized!');
}

export const isAdminOrSelf = (req, res, next) => {
  const user = req.user;
  if (user.accessLevel == 3 || user._id === req.params.userId)
    return next();
  return res.status(403).send('Not authorized!');
}


