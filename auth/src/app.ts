import express from 'express';
import cookieParser from 'cookie-parser';

import userRouter from './router/userRouter';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', userRouter);

export default app;
