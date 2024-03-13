const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [3, "name must have at least 3 characters"],
    trim: true,
    min: 3,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    // unique: true,
  },

  password: {
    type: String,
    required: [6, "must have at least 20 character"],
    trim: true,
    min: 6,
  },

  userImage: {
    type: String,
    default: "/upload/userImgPHolder", // no default
  },

  aboutTheUser: {
    type: String,
    // required: [20, "must have at least 20 character"],
    trim: true,
    min: 20,
    max: [255, "must have at least 20 character"],
  },

  role: {
    type: String,
    enum: ["admin", "user", "visitor"],
    default: "visitor",
  },
});

UserSchema.pre("save", async function (next) {
  console.log(this.modifiedPaths());
  console.log(this.isModified("userImage"));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // this refer to the document
  next();
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

//

// UserSchema.methods.createToken = function () {
// const createJwt = ({payload}) ={

// }
// };

module.exports = mongoose.model("User", UserSchema);
