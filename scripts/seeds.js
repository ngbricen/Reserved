const mongoose = require("mongoose");
const db = require("../models/usersearch");
mongoose.Promise = global.Promise;

// Generalizing it to have an idea on how and where to start
// Will be working on it with rest of backend team


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ms_support",
  {
    useMongoClient: true
  }
);

const msSeed = [
// Atlanta area codes
	{
		username: "druleyrose",
		agerange: "30-39",
		sex: "F",
		location: 30301
	},
	{
		username: "MaryJane",
		agerange: "30-39",
		sex: "F",
		location: 30324	
	},
	{
		username: "MaryJane23",
		agerange: "20-29",
		sex: "F",
		location: 30319			
	},
	{
		username: "Artist1",
		agerange: "40-49",
		sex: "F",
		location: 30334		
	},
	{
		username: "DannaJones",
		agerange: "40-49",
		sex: "F",
		location: 30388			
	},
	{
		username: "Sarah23",
		agerange: "20-29",
		sex: "F",
		location: 30317		
	},
	{
		username: "FrancisLee",
		agerange: "20-29",
		sex: "F",
		location: 30325			
	},
	{
		username: "DaisyBee",
		agerange: "20-29",
		sex: "F",
		location: 30336			
	},
	{
		username: "FrankMiller",
		agerange: "40-49",
		sex: "M",
		location: 30324			
	},
	{
		username: "DaisyLu",
		agerange: "20-29",
		sex: "F",
		location: 30325		
	},
	{
		username: "BobHope",
		agerange: "20-29",
		sex: "M",
		location: 30336			
	},
	{
		username: "Mary43",
		agerange: "30-39",
		sex: "F",
		location: 30331			
	},
	{
		username: "Valerie",
		agerange: "50-59",
		sex: "F",
		location: 30346			
	},
	{
		username: "Pheona",
		agerange: "30-39",
		sex: "F",
		location: 31107			
	},

//Athens

	{
		username: "druleyrose12",
		agerange: "30-39",
		sex: "F",
		location: 30601
	},
	{
		username: "MaryJane12",
		agerange: "30-39",
		sex: "F",
		location: 30604
	},
	{
		username: "MaryJane23",
		agerange: "20-29",
		sex: "F",
		location: 30608	
	},
	{
		username: "Artist43",
		agerange: "40-49",
		sex: "F",
		location: 30609		
	},
	{
		username: "DannaJones12",
		agerange: "40-49",
		sex: "F",
		location: 30605		
	},
	{
		username: "Sarah12",
		agerange: "20-29",
		sex: "F",
		location: 30609
	},
	{
		username: "FrancisLee12",
		agerange: "20-29",
		sex: "F",
		location: 30601			
	},
	{
		username: "DaisyBee12",
		agerange: "20-29",
		sex: "F",
		location: 30622			
	},
	{
		username: "FrankMiller12",
		agerange: "40-49",
		sex: "M",
		location: 30683			
	},
	{
		username: "DaisyLu12",
		agerange: "20-29",
		sex: "F",
		location: 30622		
	},
	{
		username: "BobHope12",
		agerange: "20-29",
		sex: "M",
		location: 30605			
	},
	{
		username: "Mary12",
		agerange: "30-39",
		sex: "F",
		location: 30622		
	},
	{
		username: "Valerie12",
		agerange: "50-59",
		sex: "F",
		location: 30602			
	},
	{
		username: "Pheona12",
		agerange: "30-39",
		sex: "F",
		location: 30612
	},
];

// db.UserSearch
//   .remove({})
//   .then(() => db.UserSearch.collection.insertMany(msSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
//mongoimport --db ms_support --collection usersearches --drop --file seeds.js