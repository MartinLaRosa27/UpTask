const Sequelize = require("sequelize");
const Participant = require("./Participant");
const Task = require("./Task");
const { DBConfiguration } = require("../config/DBConfiguration");

const Project = DBConfiguration.define("project", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING(144),
    allowNull: false,
    validate: {
      len: [3, 255],
      notEmpty: true,
    },
  },
});
Project.hasMany(Participant);
Project.hasMany(Task);

module.exports = Project;
