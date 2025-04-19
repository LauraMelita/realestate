export const handleFavicon = (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') return res.status(204).end();

  next();
};
