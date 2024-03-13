const express = require("express");
const router = express.Router();

const {
  // createUser,
  allUsers,
  singleUser,
  editUser,
  showCurrentUser,
  deleteUser,
  updateUserPassword,
  pictureOfUser,
} = require("../controllers/user");

// const {
//   authenticateUser,
//   authorizePermissions,
// } = require("../middleware/authentication");

// ##### non API

// router.route("/").User(createUser);
// router.route("/").get(authenticateUser, authorizePermissions, allUsers); oneway
router.route("/").get(allUsers); // more roles can be pass here this is invoke directly therefore we return a function
router.route("/showMe").get(showCurrentUser); // authenticateUser got the req.userinfo no need to query db
router.route("/uploadUserPic/:id").post(pictureOfUser);
router.route("/updateUser").patch(editUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(singleUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
