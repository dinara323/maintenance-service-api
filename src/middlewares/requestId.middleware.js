import { v4 as uuid } from 'uuid';

export default function requestId(req, res, next) {
    const id = uuid();

    req.requestId = id;

    res.setHeader(
        'X-Request-ID',
        id
    );

    next();
}