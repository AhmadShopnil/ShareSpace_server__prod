import express, { Application } from 'express';
import router from './routes';
const app: Application = express();
import cors from 'cors';
import { Flat } from './modules/flat/flat.model';

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(express.urlencoded({ extended: false }));

// Update the category field for all documents
app.get('/update-category', async (req, res) => {
  const category = 'Flat';

  if (!category) {
    return res.status(400).send({ message: 'Category is required' });
  }

  if (!['Flat', 'Tin-Shade', 'Tiner-ghor'].includes(category)) {
    return res.status(400).send({ message: 'Invalid category' });
  }

  try {
    const result = await Flat.updateMany(
      {},
      { $set: { category } },
      // { multi: true },
    );
    res.status(200).send({ message: 'Category updated', result });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
