import express from 'express';
import countriesRouter from './routes/CountriesRoute.js';
import {connectDatabase} from './db/client.js';	
import 'dotenv/config';

const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/api/countries', countriesRouter);

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => console.log(error, 'failed to start server'));

