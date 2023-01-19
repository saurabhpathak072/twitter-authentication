const express = require("express");
const dotenv = require('dotenv');

// -------------- Import Middleware --------------------
const { authCheck } = require("./middleware/authcheck");
// -----------------------------------------------------

const homerouter = require('./API/routers/home');

// ---------------------- config ------------------------
dotenv.config();
const app = express();
// -------------------------------------------------------

// ---------------------- API Routes ---------------------
// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.use('/home',authCheck,homerouter);
// -------------------------------------------------------


// connect react to nodejs express server  
app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`))