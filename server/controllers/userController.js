const User = require("../models/User");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const { QueryTypes } = require("sequelize");
const { createToken } = require("../helpers/jwt");

// ---------------------------------------------------------------------------
module.exports.postUser = async (input) => {
  const { username, country, password } = input;
  try {
    const newPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      _id: shortid.generate(),
      username,
      country,
      password: newPassword,
    });
    const token = createToken(user);
    return token;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create user");
  }
};

// ---------------------------------------------------------------------------
module.exports.userAuthentication = async (input) => {
  const { username, password } = input;
  try {
    const userExists = await User.findOne({
      where: {
        username,
      },
    });
    if (!userExists) {
      throw new Error("Incorrect login information");
    }
    if (!bcrypt.compareSync(password, userExists.password)) {
      throw new Error("Incorrect login information");
    }
    const token = createToken(userExists);
    return token;
  } catch (e) {
    throw new Error(e);
  }
};

// ---------------------------------------------------------------------------
module.exports.patchUser = async (input, user) => {
  const { username, country } = input;
  if (user) {
    try {
      await User.sequelize.query(
        `UPDATE users SET username='${username}', country='${country}'
        WHERE _id='${user._id}';`,
        {
          type: QueryTypes.UPDATE,
        }
      );
      const modifyUser = await User.findOne({
        where: {
          _id: user._id,
        },
      });
      const token = createToken(modifyUser);
      return token;
    } catch (e) {
      console.log(e);
      throw new Error("user information could not be modified");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.getUserByUsername = async (username, projectId, user) => {
  if (user) {
    try {
      const users = await User.sequelize.query(
        `SELECT u._id, u.img, u.username, u.country
        FROM users AS u 
        LEFT OUTER JOIN participants AS pp ON pp.userId = u._id AND pp.projectId = "${projectId}"
        WHERE u.username LIKE "%${username}%" AND u._id <> "${user._id}" AND pp._id IS NULL
        LIMIT 12;`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return users;
    } catch (e) {
      console.log(e);
      throw new Error(
        `Could not get the results for the name search ${username}`
      );
    }
  } else {
    throw new Error("session expired");
  }
};
