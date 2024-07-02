import express, { Application } from 'express';
import router from './routes';
const app: Application = express();

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
