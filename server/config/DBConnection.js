require("../models/User");
require("../models/Category");
require("../models/Project");
require("../models/Participant");
require("../models/Task");
require("../models/Country");
require("../models/Adminsistrator");
const { DBConfiguration } = require("./DBConfiguration");

module.exports.DBConnection = () => {
  DBConfiguration.sync()
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((e) => console.log(e));
};
