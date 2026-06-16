const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// In this we are requires the rotues from the authroutes.js file
const authRouter = require("./routes/authroutes");

// Here we are using all the routes from the authroutes.js file
app.use("/api/auth", authRouter);




module.exports = app;