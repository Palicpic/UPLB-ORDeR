require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;

const authRoute = require("./routes/auth.route");
const docNameRoute = require('./routes/document.route');

const passportStrategy = require("./middleware/passport");




app.use(
	cookieSession({
		name: "session",
		keys: ["order"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(bodyparser.json()); //utilizes the body-parser package
app.use(bodyparser.urlencoded({extended: true}));

app.use("/auth", authRoute);
app.use("/docName", docNameRoute);

//Mongoose setup
const db = mongoose.connection;
const mongoURI = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('The connection with mongod is established');
  }
);


// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', mongoURI));
// db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(port, () => console.log(`Listenting on port ${port}...`));