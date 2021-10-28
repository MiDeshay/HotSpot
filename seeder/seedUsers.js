const Product = require("../models/User");
const Group = require('../models/Group');
const Event = require('../models/Events');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const dev = require('../config/keys').mongoURI

const products = [
  new Product({
    username: "demo",
    firstName: "Demo",
    lastName: "User",
    email: "Demo@demo.test",
    password: "123456",
  }),
]

const group = new Group({
  name: "Demo Group",
  description: "A group for the demo user ",
  ownerId: "",
  members: [],
  events: []
})

const event = new Event({
  address: "1234 Fake St",
  city: "Fake City",
  hostEmail: "Demo@demo.test",
  title: "Demo's Event!",
  description: "BBQ and potluck meetup.",
  mapLat: 37.60,
  mapLng: -122.4330609,
  startTime: "12:45",
  startDate: "2030-10-16",
  endDate: "2030-10-18"
})

//connect mongoose
mongoose
  .connect(dev, { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });

//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
products.map(async (p, index) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(p.password, salt, (err, hash) => {
      if (err) throw err;
      p.password = hash;

      p.save().then( user =>{
        group.ownerId = user.id;
        group.members = [user.id];
        group.save().then( () =>{
            p.groupsJoined.push(group);
            p.save();
            event.host.push(user);
            event.group = group;
            event.save().then(()=> mongoose.disconnect())
        })
      })
    })
  })
});



