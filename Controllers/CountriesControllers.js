import Country from "../models/Countries.js";

export const getCountries = async (req, res) => {
  const {visited} = req.query;

  try {
    let countries;

    if (visited) {
      countries = await Country.find({ visited: visited }).sort({ name: 1 });
    } else {
      countries = await Country.find().sort({ name: 1 });
    }

    res.status(200).json(countries);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCountryperCode = async (req, res) => {
res.json(req.country);
};


export const createCountry = async (req, res) => {
  const { name, alpha2Code, alpha3Code } = req.body;
  try {
    const country = await Country.create({ name, alpha2Code, alpha3Code });
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyCountry = async (req, res) => {
  const { code } = req.params;
  const country = await Country.findOneAndUpdate({ $or: [{ alpha2Code: code.toUpperCase() }, { alpha3Code: code.toUpperCase() }] }, req.body, { new: true });
  res.json(country);
}

export const deleteCountry = async (req, res) => {
  const { code } = req.params;

  try {
    const country = await Country.findOne({ $or: [{ alpha2Code: code.toUpperCase() }, { alpha3Code: code.toUpperCase() }] });
    country.visited = !country.visited;
    await country.save();
    res.json({ message: `Country ${country.visited ? 'marked as visited' : 'marked as to visit'}.`, country: country });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }


};
