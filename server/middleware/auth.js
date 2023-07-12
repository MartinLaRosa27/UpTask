const { decodeToken } = require("../helpers/jwt");

module.exports.auth = (token) => {
  try {
    const user = decodeToken(token);
    return user;
  } catch (e) {
    return null;
  }
};
