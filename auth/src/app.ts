import express from 'express';
import userRouter from './router/userRouter';

const app = express();
app.use(express.json());

app.use('/api/v1', userRouter);

export default app;
