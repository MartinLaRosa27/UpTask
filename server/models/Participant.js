const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Participant = DBConfiguration.define("participant", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Participant;
