const express = require("express");
const morgan = require('morgan');
const routes = require("./routes");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const errorHandler = require('./middleware/errorHandler');

// Configure body parser for AJAX requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// Log requests to console
app.use(morgan('dev'));  

// Serve up static assets
app.use(express.static("client/build/"));
app.use(express['static'](__dirname+'client/public', {maxAge: 86400000}));

// Add routes, both API and view
app.use(routes);

// swagger docs route
//app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// db.sequelize.sync({ force: true }).then(function() {
// 	require('./scripts/seed.js')(db);
// 	app.listen(PORT, function() {
// 	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// 	});
// });

app.listen(PORT, function() {
	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	})