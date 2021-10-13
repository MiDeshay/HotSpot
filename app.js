// Had to add const { TextEncoder, TextDecoder } = require("util");
// to top of node_modules/whatwg-url/dist/encoding.js
const mongoose = require('mongoose');
const express = require("express");
const db = require('./config/keys').mongoURI;
// Express Routes for our models
const users = require("./routes/api/users");
<<<<<<< HEAD
const events = require('./routes/api/events')

=======
const events = require("./routes/api/events");
const groups = require("./routes/api/groups");
>>>>>>> 3e450adbac0c05d817c45c46e49626c87dbf4dae
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const path = require('path');
if (process.env.NODE_ENV === 'production') {
   app.use(express.static('frontend/build'));
   app.get('/', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
   })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Express routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/groups", groups);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is runnin on port ${port}`));

