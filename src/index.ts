import dotenv from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV ?? 'development'}`;
dotenv.config({ path: envFile });

import express from 'express';
import homeRouter from './routes/home.route';
import footerRouter from './routes/footer.route';
import { errorMiddleware } from './middleware/error.middleware';
import { requestLogger } from './middleware/request_logger.middleware';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB } from './config/db.config';
import logger from './config/logger.config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/home', homeRouter);
app.use('/api/footer', footerRouter);

app.get('/api', (_req, res) => {
  res.send('API is running.');
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(errorMiddleware);

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    }).on('error', (err: Error) => {
      logger.error(`Server error: ${err.message}`);
      process.exit(1);
    });
  })
  .catch((error: Error) => {
    logger.error(`Failed to initialize: ${error.message}`);
    process.exit(1);
  });
