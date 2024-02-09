import express from 'express';
import {getCountries, getCountryperCode, createCountry, modifyCountry, deleteCountry} from '../Controllers/CountriesControllers.js';

const CountriesRouter = express.Router();

CountriesRouter.get('/', getCountries);
CountriesRouter.get('/:code', getCountryperCode);
// CountriesRouter.post('/', createCountry);
CountriesRouter.post('/add', createCountry);
CountriesRouter.put('/:code', modifyCountry);
CountriesRouter.delete('/:code', deleteCountry);

export default CountriesRouter;
