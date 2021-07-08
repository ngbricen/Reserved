const router = require("express").Router();
const authRoutes = require('./auth'); 
const usersRoutes = require('./users'); 
const postsRoutes = require('./posts'); 

//const middlewareRoutes = require('./middleware'); 
//const config = require("../../config/config.json");
// var jwt    = require('jsonwebtoken');

//auth routes
router.use('/auth', authRoutes);

//users routes
router.use('/users', usersRoutes);

//users routes
router.use('/posts', postsRoutes);

module.exports = router;
