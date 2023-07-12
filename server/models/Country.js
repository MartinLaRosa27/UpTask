const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Country = DBConfiguration.define("country", {
  _id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
  },

  phone_code: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  country_code: {
    type: Sequelize.STRING(5),
    allowNull: false,
    validate: {
      len: [1, 5],
      notEmpty: true,
    },
  },

  country_name: {
    type: Sequelize.STRING(144),
    allowNull: false,
    validate: {
      len: [1, 144],
      notEmpty: true,
    },
  },
});

module.exports = Country;
