const jwt = require("jwt-simple");
const moment = require("moment");

// ---------------------------------------------------------------------------
export const createToken = (admin: any) => {
  try {
    const payload = {
      _id: 1,
      admin: true,
      username: "admin",
      country: "admin",
      img: "admin",
      exp: moment().unix() + process.env.NEXT_PUBLIC_TOKEN_EXP_SEC,
    };
    const token = jwt.encode(payload, process.env.NEXT_PUBLIC_SECRET);
    return token;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// --------------------------------------------------------------------------
export const decodeToken = (token: any) => {
  let payload = null;
  const tokenAux = token.replace(/['"]+/g, "");
  payload = jwt.decode(tokenAux, process.env.NEXT_PUBLIC_SECRET);
  if (payload.exp <= moment().unix()) {
    payload = null;
  }
  return payload;
};
