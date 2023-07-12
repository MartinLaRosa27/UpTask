const Country = require("../models/Country");

// ---------------------------------------------------------------------------
module.exports.getAllCountries = async () => {
  try {
    const countries = await Country.findAll({
      order: [["country_name", "ASC"]],
    });
    return countries;
  } catch (e) {
    console.log(e);
    throw new Error("countries could not be returned");
  }
};
