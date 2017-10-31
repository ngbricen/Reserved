const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const db = require("./models");
const session = require('express-session');
const config = require('./config/index');
const flash    = require('connect-flash');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
// Log requests to console
app.use(morgan('dev'));  

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));

// pass the passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Bring in defined Passport Strategy
require('./config/passport')(passport, app);  

// Serve up static assets
app.use(express.static("client/build/"));
app.use(express['static'](__dirname+'client/public', {maxAge: 86400000}));

// Add routes, both API and view
app.use(routes);

db.sequelize.sync({ force: false }).then(function() {
	// require('./scripts/seeds.js')(db);
	// require('./scripts/countrySeeds.js')(db);
	// require('./scripts/territorySeeds.js')(db);
	// require('./scripts/stateSeeds.js')(db);
	app.listen(PORT, function() {
	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	});
});