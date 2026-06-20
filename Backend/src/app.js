const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// In this we are requires the rotues from the authroutes.js file
const authRouter = require("./routes/authroutes");
const interviewRouter = require("./routes/interview.routes");

// Here we are using all the routes from the authroutes.js file
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);




module.exports = app;