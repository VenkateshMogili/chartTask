const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const app = express()
.use(bodyParser.json())
const port = process.env.PORT || 5000;

app.use("/users", users);

app.listen(port,()=>{
    console.log("Server is running on port: "+port);
});