import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import homeRouter from './routes/home.route';
import footerRouter from './routes/footer.route';
import { errorMiddleware } from './middleware/error.middleware';
import { requestLogger } from './middleware/request_logger.middleware';
import helmet from 'helmet';
import cors from 'cors';

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
