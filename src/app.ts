import express, { Application } from 'express';
import router from './routes';
const app: Application = express();
import cors from 'cors';

import notFoundRoute from './middlewares/notFoundRoute';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { Flat } from './modules/flat/flat.model';

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(express.urlencoded({ extended: false }));

// Update the role field for all documents
app.get('/update-flat', async (req, res) => {
  const totalBathrooms = 3;

  if (!totalBathrooms) {
    return res.status(400).send({ message: 'role is required' });
  }

  // if (!['Flat', 'Tin-Shade', 'Tiner-ghor'].includes(role)) {
  //   return res.status(400).send({ message: 'Invalid role' });
  // }

  try {
    const result = await Flat.updateMany(
      {},
      { $set: { totalBathrooms } },
      // { multi: true },
    );
    res.status(200).send({ message: 'totalBathrooms updated', result });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

app.get('/', (req, res) => {
  res.send('Share Space Server is Running');
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
