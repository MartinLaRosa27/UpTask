const jwt = require("jwt-simple");
const moment = require("moment");

// ---------------------------------------------------------------------------
module.exports.createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    country: user.country,
    img: user.img,
    exp: moment().unix() + process.env.TOKEN_EXP_SEC,
  };
  const token = jwt.encode(payload, process.env.SECRET);
  return token;
};

// --------------------------------------------------------------------------
module.exports.decodeToken = (token) => {
  const tokenAux = token.replace(/['"]+/g, "");
  const payload = jwt.decode(tokenAux, process.env.SECRET);
  if (payload.exp <= moment().unix()) {
    throw new Error("Expired token");
  }
  return payload;
};

// --------------------------------------------------------------------------
module.exports.createTokenAdmin = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    password: user.password,
    exp: moment().unix() + process.env.TOKEN_EXP_SEC,
  };
  const token = jwt.encode(payload, process.env.SECRET);
  return token;
};
