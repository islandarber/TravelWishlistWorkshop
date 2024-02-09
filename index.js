import express from 'express';
import countriesRouter from './routes/CountriesRoute.js';
import {connectDatabase} from './db/client.js';	
import 'dotenv/config';
import path from 'path';
import Country from './models/Countries.js';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/countries', countriesRouter);


app.get('/', async(req, res) => {
  const countries = await Country.find();
  res.render('partials/pages/index', {countries});
});



const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => console.log(error, 'failed to start server'));

