const router = require("express").Router();
const authRoutes = require('./auth'); 
const usersRoutes = require('./users'); 

//const middlewareRoutes = require('./middleware'); 
const config = require("../../config/index");
var jwt    = require('jsonwebtoken');

// //auth routes
router.use('/auth', authRoutes);

//users routes
router.use('/users', usersRoutes);

module.exports = router;
