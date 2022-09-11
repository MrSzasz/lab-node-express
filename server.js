// Main exports

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;


// Routes exports

const HomeRoutes = require('./routes/home')


// Middlewares

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes

app.use("/api", HomeRoutes)


// Server

app.listen(port, ()=>console.log("Server on port " + port))