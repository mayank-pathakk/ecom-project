import express from 'express';

const app = express();

app.get('*', (req, res) => {
  res.status(302).send({});
});

export default app;