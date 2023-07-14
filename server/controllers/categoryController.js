const Category = require("../models/Category");
const Project = require("../models/Project");
const Task = require("../models/Task");
const shortid = require("shortid");
const Participant = require("../models/Participant");
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
      const proyect = await Project.findOne({
        where: {
          categoryId: id,
        },
      });
      await Task.destroy({
        where: {
          projectId: proyect._id,
        },
      });
      await Participant.destroy({
        where: {
          projectId: proyect._id,
        },
      });
      await Project.destroy({
        where: {
          categoryId: id,
        },
      });
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
