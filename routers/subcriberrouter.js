const express = require("express");
const router = express.Router();

const {
  createNewsLetter,
  getAllNewsLetterEmail,
} = require("../controllers/subscription");

router.route("/").post(createNewsLetter);
router.route("/").get(getAllNewsLetterEmail);

module.exports = router;
