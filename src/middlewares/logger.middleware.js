export default function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    console.log({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${Date.now() - start}ms`,
      requestId: req.requestId
    });
  });

  next();
}