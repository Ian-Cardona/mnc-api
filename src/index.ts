import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import homeRouter from './routes/home';
import footerRouter from './routes/footer';
import { errorMiddleware } from './middleware/error.middleware';
import { requestLogger } from './middleware/request_logger.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.use('/home', homeRouter);
app.use('/footer', footerRouter);

app.get('/', (_req, res) => {
  res.send('API is running.');
});

app.use(errorMiddleware); 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});