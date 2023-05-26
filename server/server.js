require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;

const authRoute = require("./routes/authRoute");
const documentRoute = require("./routes/documentRoute");
const signRoute = require("./routes/signRoute");
const adminRoute = require("./routes/adminRoute");
const contractRoute = require("./routes/contractRoute");

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
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(bodyparser.json()); //utilizes the body-parser package
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/document", documentRoute);
app.use("/sign", signRoute);
app.use("/admin", adminRoute);
app.use("/contract", contractRoute);
app.use("/uploads", express.static("uploads"));

//Mongoose setup
const db = mongoose.connection;
const mongoURI = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("The connection with mongod is established");
});

// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', mongoURI));
// db.on('disconnected', () => console.log('mongo disconnected'));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listenting on port ${port}...`));
