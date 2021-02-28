const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const colors = require('colors');

const connectDb = require('./config/db');
require('dotenv').config()
const usersRouter = require("./routes/users");
const {errorHandler, pageNotFoundHandler} = require('./utils/errorHandler');



const { json, urlencoded } = express;

const app = express();

connectDb();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));



// Routes
app.use('/users',usersRouter)


app.use(pageNotFoundHandler);
app.use(errorHandler);


module.exports = app;
