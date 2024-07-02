import express, { Application } from 'express';
import router from './routes';
const app: Application = express();
import cors from 'cors';

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
