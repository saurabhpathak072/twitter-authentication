const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const session = require("express-session");

// -------------- Import Middleware --------------------
const passportSetup = require('./config/passport-setup')
const { authCheck } = require("./middleware/authcheck");
// -----------------------------------------------------

const homerouter = require("./API/routers/home");
const authRoutes = require("./API/routers/auth-routes");

// ---------------------- config ------------------------
dotenv.config();
const app = express();
// -------------------------------------------------------

// -------------------- Middlewares ----------------------
app.use(
  cookieSession({
    name:'session',
    keys:process.env.COOKIE_KEY,
    maxAge: 24 * 60 * 60 * 100
  })
)

// parse cookies
app.use(cookieParser());

// initialize passport
app.use(passport.initialize());

// deserialize cookie from browser
app.use(passport.deserializeUser());

// Set up cors to allow us to accept request from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
// -------------------------------------------------------

// ---------------------- API Routes ---------------------
// Set up Auth Routes
app.use("/auth", authRoutes);

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.use("/home", authCheck, homerouter);
// -------------------------------------------------------

// connect react to nodejs express server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
