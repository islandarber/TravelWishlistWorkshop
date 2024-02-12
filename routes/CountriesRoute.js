import express from 'express';
import {getCountries, getCountryperCode, createCountry, modifyCountry, deleteCountry} from '../Controllers/CountriesControllers.js';
import { checkCountryExistance } from '../middlewares/countries.js';

const CountriesRouter = express.Router();

CountriesRouter.get('/', getCountries);
CountriesRouter.get('/:code', checkCountryExistance, getCountryperCode);
CountriesRouter.post('/',checkCountryExistance, createCountry);
CountriesRouter.put('/:code',checkCountryExistance, modifyCountry);
CountriesRouter.delete('/:code',checkCountryExistance, deleteCountry);

export default CountriesRouter;
