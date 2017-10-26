const dbUser = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require("../config/index");

// Defining methods for the usersController
module.exports = {
  findById: function(req, res) {
    dbUser
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    dbUser
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    dbUser
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    dbUser
      .create(req.body, function(err) {
         if (err) {
          return res.status(422).json({ success: false, message: 'That email address already exists.'});
         }
          return res.status(200).json({ success: true, message: 'Successfully created new user.'});
    }); 
  }
};