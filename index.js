const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require( 'cors' );
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const path = require("path");
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use( cors() );
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.listen(8800, () => {
 console.log("Backend server is running!");
});
