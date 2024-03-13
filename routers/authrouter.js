const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();

const { addUser, loginUser, logoutUser } = require("../controllers/auth");
const {
  authenticateUser,
  authenticateUserHasLogIn,
} = require("../middleware/authentication");

// ############## non - API ##########################
router.get("/signup", (req, res) => {
  res.render("registration");
});

router.get("/login", (req, res) => {
  req.user = null; // or req.user = {};
  console.log("req.user in /login route:", req.user); // Check if req.user is defined here

  res.render("login", { userLogged: req.user });
});

router.get("/dash", authenticateUser, (req, res) => {
  // console.log(req.user);
  // pase user here
  if (!req.user) {
    return console.log("sorry login first ");
  }

  res.status(200).render("dash", { user: req.user });
});

router.get("/dashboard", authenticateUser, (req, res) => {
  // console.log(req.user);
  // pase user here
  if (!req.user) {
    return console.log("sorry login first ");
  }
  // console.log(req.user);
  res.status(200).render("dashboard", { user: req.user });
});

// ##############  API ##########################
router.route("/add").post(addUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

module.exports = router;
