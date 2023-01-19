const express = require("express");
const dotenv = require('dotenv');

const homerouter = require('./API/routers/home')

// ---------------------- config ------------------------
dotenv.config();
const app = express();
// -------------------------------------------------------

// ---------------------- API Routes ---------------------
app.use('/home',homerouter);
// -------------------------------------------------------


// connect react to nodejs express server  
app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`))