const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const mongoose = require("mongoose"); //mongoose used here, making mongodb below
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const db = require("./models");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
// Log requests to console
app.use(morgan('dev'));  

// pass the passport middleware
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);  

// Serve up static assets
app.use(express.static("client/build/"));
app.use(express['static'](__dirname+'client/public', {maxAge: 86400000}));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

if(process.env.NODE_ENV == 'production'){
  // Gotten using `heroku config | grep MONGODB_URI` command in Command Line
  //mongoose.connect('mongodb://heroku_b1gmf87k:a513rrhtaikr597ug58qdeh1fq@ds163294.mlab.com:63294/heroku_b1gmf87k');
}
else{
  mongoose.connect('mongodb://localhost/reserved');
}

db.sequelize.sync({ force: true }).then(function() {
	require('./scripts/seeds.js')(db);
	app.listen(PORT, function() {
	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	});
});