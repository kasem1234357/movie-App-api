const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require('helmet');
const cors = require( 'cors' );
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const corsOptions = {
  origin: '*', // Specify the allowed origin(s) here
  methods: 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  allowedHeaders: 'Origin, Content-Type, X-Requested-With, Accept, Authorization',
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));
// app.use(function(req,res,next){
//    res.header('Access-Control-Allow-Origin',"*")
//    res.header(
//     'Access-Control-Allow-Methods',
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//    );
//    res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, Content-Type, X-Requested-With, Accept, Authorization'
//    );
//    next();
// })
mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.error('Failed to connect to MongoDB:', error);
    } else {
      console.log('Connected to MongoDB');
    }
  }
);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.listen(8800, () => {
 console.log("Backend server is running!");
});
