import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import homeRouter from './routes/home';
import footerRouter from './routes/footer';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(errorMiddleware);

app.use('/home', homeRouter);
app.use('/footer', footerRouter);

app.get('/', (_req, res) => {
  res.send('API is running.');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});