const mongoose = require("mongoose");

const connect = async (uri) => {
  return mongoose.connect(uri, console.log("DB connected"));
};

module.exports = connect;
