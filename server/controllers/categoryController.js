const Category = require("../models/Category");

// ---------------------------------------------------------------------------
module.exports.getAllCategories = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (e) {
    console.log(e);
    throw new Error("categories could not be returned");
  }
};
