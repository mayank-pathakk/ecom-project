import express from 'express';

const app = express();

app.get('*', (req, res) => {
  res.status(200).send({});
});

app.use(express.json());

export default app;
