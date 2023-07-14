const Category = require("../models/Category");
const shortid = require("shortid");
const { QueryTypes } = require("sequelize");

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

// ---------------------------------------------------------------------------
module.exports.deleteCategory = async (id, user) => {
  if (user.admin) {
    try {
      const category = await Category.destroy({
        where: {
          _id: id,
        },
      });
      return category;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to delete the project");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.patchCategory = async (id, input, user) => {
  const { name } = input;
  if (user.admin) {
    try {
      const category = await Category.sequelize.query(
        `UPDATE categories SET name='${name}'
        WHERE _id='${id}';`,
        {
          type: QueryTypes.UPDATE,
        }
      );
      return category;
    } catch (e) {
      console.log(e);
      throw new Error("category could not be modified");
    }
  } else {
    throw new Error("session expired");
  }
};
