export default function logger(req, res, next) {

    console.log({
        method: req.method,
        url: req.url,
        time: new Date().toISOString(),
        requestId: req.requestId
    });

    next();
}