const jwt = require("jsonwebtoken");

// create a function that return JWT

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXP_DATE,
  });
  return token;
};

// verification of token

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// attacheCookies to request
// user represent tokenUser
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJwt({ payload: user }); // step one create token, user = token user from auth user

  // then
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  // console.log(token, "from jwt");
  //   res.status(201).json({ user }); // but its limited
};
module.exports = { createJwt, isTokenValid, attachCookiesToResponse };
