import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  alpha2Code: {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Validate against ISO 3166-1 alpha-2 code format
        return /^[A-Z]{2}$/.test(value);
      },
      message: "Invalid alpha2Code",
    },
  },
  alpha3Code: {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Validate against ISO 3166-1 alpha-3 code format
        return /^[A-Z]{3}$/.test(value);
      },
      message: "Invalid alpha3Code",
    },
  },
  visited: {
    type: Boolean,
    default: false,
  },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
