const Category = require("../models/Category");
const shortid = require("shortid");

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

// ---------------------------------------------------------------------------
module.exports.postCategory = async (user, input) => {
  const { name } = input;
  console.log(user)
  if (user.admin) {
    try {
      const category = await Category.create({
        _id: shortid.generate(),
        name,
      });
      return category;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to register the category");
    }
  } else {
    throw new Error("session expired");
  }
};
