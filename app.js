const express = require("express");
const mongoose = require('mongoose');
const app = express();
// You can now delete our 'Hello World' route
//app.get("/", (req, res) => res.send("Hello yo"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
const db = require('./config/keys').mongoURI;

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
  .connect(db, {
      useUnifiedTopology: true,
       useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  app.use(bodyParser.urlencoded({ extended: false }));// needed for postman requests
  app.use(bodyParser.json());//needed for responding to json requests

app.use(passport.initialize());
 require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/tweets", tweets);

