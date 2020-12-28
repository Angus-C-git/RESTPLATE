/**
 * <-------------------------> IMPORTS <------------------------->
 * */

const express = require('express');     // Express JS
const dotenv = require('dotenv');       // Environment variables
const mongoose = require('mongoose');   // Mongo DB Wrapper
const cors = require('cors');           // Cross Origin Security Headers

const app = express();
dotenv.config();

// DB Connection init
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
        console.log("Connected to db...");
});

// Middlewares
app.use(express.json());
app.use(cors());

/**
 * <---------------------------> ROUTES <--------------------------->
 * */

// Basic JWT auth routes
const authRoute = require('./routes/auth');

// Example posts route
const posts = require('./routes/posts');

/**
 * <---------------------> ROUTE MIDDLEWARES <---------------------->
 * */

app.use('/api/user', authRoute);
app.use('/api/posts', posts);


// API Base Endpoint
app.get("/", (Req, res) => {
    res.send("Running ..");
});

/**
 * <-----------------------> DEVOPS RUNNER <------------------------>
 * */

let port = process.env.PORT;
// dev mode switch
port = (!port || port === "") ? 8000 : port;

// API Listener init
app.listen(port);

