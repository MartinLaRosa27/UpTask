const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Task = DBConfiguration.define("task", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100],
      notEmpty: true,
    },
  },

  completed: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    default: 0,
  },
});

module.exports = Task;
