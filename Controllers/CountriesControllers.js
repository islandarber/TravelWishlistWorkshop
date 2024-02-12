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

  const {code} = req.params;
  console.log(code);

  try {
    if (code.length === 2) {
      const country = await Country.findOne({ alpha2Code: code });
      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }
      return res.status(200).json(country);
    } else if (code.length === 3) {
      const country = await Country.findOne({ alpha3Code: code });
      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }
      return res.status(200).json(country);
    } else {
      return res.status(404).json({ error: "Invalid country code" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  
};


export const createCountry = async (req, res) => {
  const { name, alpha2Code, alpha3Code } = req.body;
  console.log(name, alpha2Code, alpha3Code);
  try {
    const country = await Country.create({ name, alpha2Code, alpha3Code });
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyCountry = async (req, res) => {
  const { code } = req.params;

  try {
    const { name, alpha2Code, alpha3Code, visited } = req.body;
    let update = {};

    if (name) {
      update.name = name;
    }
    if (alpha2Code) {
      update.alpha2Code = alpha2Code;
    }
    if (alpha3Code) {
      update.alpha3Code = alpha3Code;
    }
    if (visited) {
      update.visited = visited;
    }

    let find = null;

    if (code.length === 2) {
      find = await Country.findOne({ alpha2Code: code });
    } else if (code.length === 3) {
      find = await Country.findOne({ alpha3Code: code });
    }

    if (!find) {
      return res.status(404).json({ error: "Country not found" });
    }

    const query = code.length === 2 ? { alpha2Code: code } : { alpha3Code: code };
    const data = await Country.findOneAndUpdate(query, update, { new: true });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  const { code } = req.params;

  try {
    let find = null;
    if (code.length === 2) {
      find = await Country.findOne({ alpha2Code: code });
    }else if (code.length === 3) {
      find = await Country.findOne({ alpha3Code: code });
    }
    
    if (!find) {
      return res.status(404).json({ error: "Country not found" });
    }

    const query = code.length === 2 ? { alpha2Code: code } : { alpha3Code: code };

    const data = await Country.findOneAndUpdate(query, { visited: true }, { new: true });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // try {
  //   let find = null;
  //   if (code.length === 2) {
  //     find = await Country.findOne({ alpha2Code: code });
  //   } else if (code.length === 3) {
  //     find = await Country.findOne({ alpha3Code: code });
  //   }

  //   if (!find) {
  //     return res.status(404).json({ error: "Country not found" });
  //   }

  //   const query = code.length === 2 ? { alpha2Code: code } : { alpha3Code: code };
  //   const data = await Country.findOneAndDelete(query,{ new: true });

  //   res.status(200).json(data);

  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

};
