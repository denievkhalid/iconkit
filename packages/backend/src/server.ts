import cors from 'cors';
import express from 'express';
import { uploadRouter } from '@/routes';

export const createServer = (port: string) => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/upload', uploadRouter);

  app.listen(port);
};
