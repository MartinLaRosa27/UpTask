const Sequelize = require("sequelize");
const Project = require("./Project");
const { DBConfiguration } = require("../config/DBConfiguration");

const Category = DBConfiguration.define("category", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING(144),
    allowNull: false,
    validate: {
      len: [1, 144],
      notEmpty: true,
    },
  },
});
Category.hasMany(Project);

module.exports = Category;
