import Country from "../models/Countries.js";

export const checkCountryExistance = async (req, res, next) => {
  const {alpha2Code, alpha3Code} = req.body;
  const {code} = req.params;

  if (req.method === 'GET' || req.method === 'DELETE' || req.method === 'PUT'){
    const country = await Country.findOne({ $or: [{ alpha2Code: code.toUpperCase()}, {alpha3Code : code.toUpperCase()}] });
    if (country){
      req.country = country;
      next()
    }else {
      return res.sendStatus(404);
    }
  }else if (req.method === 'POST') {
    const existingCountry = await Country.findOne({ $or: [{ alpha2Code }, { alpha3Code }] });
    if (existingCountry) {
      return res.status(409).json({message:'Country already exists.'});
    }else {
      next()
    }
  }


}