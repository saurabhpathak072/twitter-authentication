const express = require("express");
const passport = require("passport");

const CLIENT_HOME_PAGE_URL = "http://localhost:3000/";

const router = express.Router();

// ----------- when login successfully, retrive user info -------------
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticate ",
      user: req.user,
      cookies: req.cookies,
    });
  }
});
// ---------------------------------------------------------------------

// ----------- When login failed, send failed msg ----------------------
router.get("/login/failed", (req, res) => {
  // res.status(401).json({
  //   success: false,
  //   message: "userfailed to authenticate",
  // });
  res.redirect("http://localhost:3000/authfailed")
});
// ---------------------------------------------------------------------

// ---------- when user logut, redirect to client ----------------------
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect(CLIENT_HOME_PAGE_URL);
  });
});
// ---------------------------------------------------------------------

// -------------------------- Auth with Twitter ------------------------
router.get("/twitter", passport.authenticate("twitter"));
// ---------------------------------------------------------------------

// ----- Redirect to Home page after successful login via twitter ------
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);
// ---------------------------------------------------------------------

module.exports = router;
