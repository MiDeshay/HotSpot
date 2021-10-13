const express = require("express");
const router = express.Router();
const Event = require('../../models/Event')

// Protected Routes
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.get( "/", (req, res) => {
   Event.find()
      .then(events => res.json(events))
      .catch(err => res.status(404).json({noEventsFound: 'No events found'}))
});

router.post( "/", 
   passport.authenticate('jwt', {session: false}),
   (req, res) => {
      const newEvent = new Event({
         title: req.body.title,
         location:{
            lat: req.body.lat,
            lng: req.body.lng,
         },
         author: req.user.id
      })
      
      newEvent.save()
         .then(event => res.json(event))
         .catch(err => res.status(400).send(err));
   }   
);

module.exports = router;