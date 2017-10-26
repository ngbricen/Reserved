const express = require('express');
const passport = require('passport');
const router = require("express").Router();
const authController = require("../../controllers/authController");

router.route("/logout")
  .get(authController.logout);

router.route("/register")
  .post(authController.register);

router.route("/authenticate")
  .post(authController.authenticate);

router.route("/:token")
	.get(authController.verifyToken);

router.route("/dashboard")
  .get(passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.send('It worked! User id is: ' + req.user + '.');
});

module.exports = router;