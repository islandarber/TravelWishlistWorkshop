import mongoose from "mongoose";
import validator from "validator";

const countrySchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    unique: true,
  },
  alpha2Code : {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
    validate: [validator.isISO31661Alpha2, "Invalid alpha2Code"]
  },
  alpha3Code : {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
    validate: [validator.isISO31661Alpha3, "Invalid alpha3Code"]
  },
  visited : {
    type: Boolean,
    default: false,
  },
});

const Country= mongoose.model("Country", countrySchema);

export default Country;