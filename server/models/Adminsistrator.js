const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Adminsistrator = DBConfiguration.define("administrator", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      len: [3, 50],
      notContains: " ",
      notEmpty: true,
    },
    unique: { args: true, msg: "email is not available" },
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      len: [8, 60],
      notContains: " ",
      notEmpty: true,
    },
  },
});
module.exports = Adminsistrator;
