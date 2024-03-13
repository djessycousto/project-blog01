const User = require("../models/User");
// const jwt = require("jsonwebtoken");
const {
  createJwt,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
} = require("../utils");

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; //add role
    // first check
    if (!name || !email || !password) {
      console.log("please provide email, name, password");
      res.status(400).json({ msg: "please provide a email, name, password" });
    }

    const user = await User.create({ ...req.body });
    //###### refactor

    // const tokenUser = { name: user.name, userId: user._id, role: user.role }; // can add role here  or other specification
    const tokenUser = createTokenUser(user);
    // const token = createJwt({ payload: tokenUser });// this one is just to create token

    // attache cookies to reponse
    attachCookiesToResponse({ res, user: tokenUser }); // this attach cookies to the response
    res.status(201).json({ user: tokenUser });
  } catch (error) {
    console.log(error);
  }
};

// end add
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "please provide the correct credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: " Credentials Invalid" });
    }

    // check Password

    const isPasswordCorrect = await user.comparePassword(password); // user that find the email (email gives the user with pass)
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: " Credentials Invalid" });
    }
    // if okay then token attach cookies

    // const tokenUser = { name: user.name, userId: user._id, role: user.role };
    const tokenUser = createTokenUser(user);
    // console.log(tokenUser);

    // Check if there is a redirect query parameter in the request
    attachCookiesToResponse({ res, user: tokenUser });

    return res.status(200).json({ user: tokenUser }); // redirect here
  } catch (error) {
    console.log(error, "login error controller");
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out" });
};

module.exports = {
  addUser,
  loginUser,
  logoutUser,
};
