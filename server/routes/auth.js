const express = require('express')
const passport = require('passport')
const router = express.Router()
const { isUserAuthenticated } = require("../middleware/auth");
const url = require("../config/url");

const loginSuccessful = url.urlClient() + "/login/success";
const loginFailed = url.urlClient() + "/login/failed";



// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
});

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: loginFailed }),
  (req, res) => { // the user details is inside the req.user
    res.redirect(loginSuccessful)
  }
)

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// @desc    Check if the client is authenticated. If yes return the user
// @route   GET /auth/user
router.get("/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});




module.exports = router