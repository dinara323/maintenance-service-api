import express from 'express';

import requestId from './src/middlewares/requestId.middleware.js';
import logger from './src/middlewares/logger.middleware.js';
import security from './src/middlewares/security.middleware.js';
import corsMiddleware from './src/middlewares/cors.middleware.js';
import rateLimit from './src/middlewares/rateLimit.middleware.js';
import notFound from './src/middlewares/notFound.middleware.js';

const app = express();

app.use(express.json());

app.use(requestId);
app.use(logger);
app.use(security);
app.use(corsMiddleware);
app.use(rateLimit);

app.get('/', (req, res) => {
    res.json({
        message: 'Maintenance Service API is running',
        requestId: req.requestId
    });
});

app.use(notFound);

export default app;