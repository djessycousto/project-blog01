const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

// drop Db

// const dropDatabase = require("./dropDb");

//##################################
const connect = require("./db/connect");
// const ejs = require("ejs");

//##################################
app.use(express.json());
app.use(cors());
app.use(fileUpload());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.JWT_SECRET));
app.set("view engine", "ejs");
//#############// route ######################

const subscriberRouter = require("./routers/subcriberrouter");
const authRouter = require("./routers/authrouter");
// const postRouter = require("./routers/testpost");
const userRouter = require("./routers/userrouter");
const nonApiRouter = require("./routers/non-Apirouter");
//#############// error handler ######################

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

//#############// error handler ######################

//############// route #######################
app.use("/posts", nonApiRouter, subscriberRouter);
// app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/newsletter-subscription", subscriberRouter);
//###################################

app.use(notFound);
app.use(errorHandler);
const port = process.env.Port || 3000; // why npm working
const start = async () => {
  try {
    // Drop the database before starting the application

    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`port ${3000} is connected`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
