const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId; 
const User = require('../../models/User');
const Event = require('../../models/Events')
const validateEventInput = require("../../validation/event")

//Can be used by both current user and event host to add users from events

//takes an email as a request and an event id in the params, 
//adds the email to an events list of attendee emails
//throws an error if the event doesn't exist or email is already on the attendee email list
//returns the event with its attendees information
router.patch("/join_event/:pinId", (req, res) => {
    Event.findOne({pinId: req.params.pinId}).then(event => {
        if (!event){
            return res.status(404).json("Event not found"); 
        }else{ 
            User.findOne({email: req.body.email}).then(user => {
                if (user){
                    if(event.attendeesEmail.includes(user.email)){
                        res.status(404).json("You are already registered for this event.");  
                    }else{
                        Event.findOneAndUpdate({pinId: req.params.pinId}, 
                            {$push: {attendeesEmail: req.body.email}}, 
                            {new: true}, (error, event) => {
                                User.findOne({email: event.hostEmail}).then(host=> {
                                    if(!host){
                                        return res.status(404).json("Host not found"); 
                                    }
                            
                                    const hostInfo = {
                                        id: host.id,
                                        username: host.username,
                                        email: host.email,
                                        firstName: host.firstName,
                                        lastName: host.lastName
                                    }
                            
                                    if (event.attendeesEmail){
                                        User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1, email: 1})
                                        .then(attendees => {
                                            res.json({
                                                id: event.id,
                                                pinId: event.pinId,
                                                city: event.city,
                                                title: event.title,
                                                address: event.address,
                                                description: event.description,
                                                mapLat: event.mapLat,
                                                mapLong: event.mapLng,
                                                host: hostInfo, 
                                                attendees: attendees,
                                                startDate: event.startDate,
                                                endDate: event.endDate 
                                            })
                                        })
                                    }else{
                                        res.json({
                                            id: event.id,
                                            pinId: event.pinId,
                                            city: event.city,
                                            title: event.title,
                                            address: event.address,
                                            description: event.description,
                                            mapLat: event.mapLat,
                                            mapLong: event.mapLng,
                                            host: hostInfo,
                                            startDate: event.startDate,
                                            endDate: event.endDate
                                        })
                                    }
                                })
                            })
                    }

                    
                }else{
                    return res.status(404).json("User not found"); 
                }

            })
            
         }

    })
})

//Can be used by both current user and event host to remove users from events

//takes an email as a request and an event id in the params, 
//removes the email from an events list of attendee emails
//throws an error if the event doesn't exist or email is already not on the attendee email list
//returns the event with its updated attendees information
router.patch("/decline_event/:pinId", (req, res) => {
    Event.findOne({pinId: req.params.pinId}).then(event => {
        if (!event){
            return res.status(404).json("Event not found"); 
        } else {
            User.findOne({email: req.body.email}).then(user => {
                if (user){
                    if(!event.attendeesEmail.includes(user.email)){
                        res.status(404).json("You are already unregistered for the event");  
                    }else{
                        Event.findOneAndUpdate({pinId: req.params.pinId}, 
                            {$pull: {attendeesEmail: req.body.email}}, 
                            {new: true}, (error, event) => {
                                User.findOne({email: event.hostEmail}).then(host=> {
                                    if(!host){
                                        return res.status(404).json("Host not found"); 
                                    }
                            
                                    const hostInfo = {
                                        id: host.id,
                                        username: host.username,
                                        email: host.email,
                                        firstName: host.firstName,
                                        lastName: host.lastName
                                    }
                            
                                    if (event.attendeesEmail){
                                        User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1, email: 1})
                                        .then(attendees => {
                                            res.json({
                                                id: event.id,
                                                pinId: event.pinId,
                                                city: event.city,
                                                title: event.title,
                                                address: event.address,
                                                description: event.description,
                                                mapLat: event.mapLat,
                                                mapLong: event.mapLng,
                                                host: hostInfo, 
                                                attendees: attendees,
                                                startDate: event.startDate,
                                                endDate: event.endDate 
                                            })
                                        })
                                    }else{
                                        res.json({
                                            id: event.id,
                                            pinId: event.pinId,
                                            city: event.city,
                                            title: event.title,
                                            address: event.address,
                                            description: event.description,
                                            mapLat: event.mapLat,
                                            mapLong: event.mapLng,
                                            host: hostInfo,
                                            startDate: event.startDate,
                                            endDate: event.endDate
                                        })
                                    }
                                })
                            })
                    }

                    
                }else{
                    return res.status(404).json("User not found"); 
                }

            })
        }
        

    })
}) 


//creates a new event with event params shown below
//returns the created event with hosters info [id, username, email, firstName, and lastName]
//throws errors if [startDate, endDate, title, description, city, address, or hostEmail ] are blank
//throws errors if title is longer than [60] characters (feel free to change this in event validations)
//throws errors if event is longer than [400] characters (same)

// city is shown to everyone
//address is shown only to group members 
//(maybe just show both for now then chnage after groups are working)

//There are no attendees by default, users have to add themselves manually 
//  (So a host can't say anyone they want is coming)
router.post("/create_event", (req, res) => {
    const {errors, isValid} = validateEventInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newEvent = new Event({
        pinId: req.body.pinId,
        address: req.body.address, 
        city: req.body.city,
        hostEmail: req.body.hostEmail,
        title: req.body.title,
        description: req.body.description,
        mapLat: req.body.mapLat,
        mapLng: req.body.mapLng,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    newEvent.save().then(event => {
     User.findOne({email: event.hostEmail}).then(host=> {
        if(!host){
            return res.status(404).json("Host not found"); 
        }

        const hostInfo = {
            id: host.id,
            username: host.username,
            email: host.email,
            firstName: host.firstName,
            lastName: host.lastName
        }
        res.json({
            id: event.id,
            pinId: event.pinId,
            title: event.title,
            city: event.city,
            address: event.address,
            description: event.description,
            mapLat: event.mapLat,
            mapLong: event.mapLng,
            host: hostInfo,
            startDate: event.startDate,
            endDate: event.endDate
        })
        
    }).catch(err => res.send(err)); 
     })
        
})  

//Updates event based on event params shown below
//Updates an event based on event params
//throws errors if new [startDate, endDate, title, description, city, address, or hostEmail ] params are blank
//throws errors if new title is longer than [60] characters 
//throws errors if new event is longer than [400] characters

//returns the updated event with host info and attendees info if there are any
router.patch("/:pinId", (req, res) => {
    
    const {errors, isValid} = validateEventInput(req.body)
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Event.findOne({pinId: req.params.pinId}).then( event => {
        if(event){
            
            Event.findOneAndUpdate({title: event.title}, {
                pinId: req.body.pinId,
                address: req.body.address, 
                city: req.body.city,
                hostEmail: req.body.hostEmail,
                title: req.body.title,
                description: req.body.description,
                mapLat: req.body.mapLat,
                mapLng: req.body.mapLng,
                startDate: req.body.startDate,
                endDate: req.body.endDate  
            },
            {new: true}, (error, event) => {
                if (error){
                    res.status(400).json(error);
                  }else{
                      
                    User.findOne({email: event.hostEmail}).then(host=> {
                        if(!host){
                            return res.status(404).json("Host not found"); 
                        }
                
                        const hostInfo = {
                            id: host.id,
                            username: host.username,
                            email: host.email,
                            firstName: host.firstName,
                            lastName: host.lastName
                        }
                
                        if (event.attendeesEmail){
                            User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1, email: 1})
                            .then(attendees => {
                                res.json({
                                    id: event.id,
                                    pinId: event.pinId,
                                    city: event.city,
                                    title: event.title,
                                    address: event.address,
                                    description: event.description,
                                    mapLat: event.mapLat,
                                    mapLong: event.mapLng,
                                    host: hostInfo, 
                                    attendees: attendees,
                                    startDate: event.startDate,
                                    endDate: event.endDate 
                                })
                            })
                        }else{
                            res.json({
                                id: event.id,
                                pinId: event.pinId,
                                city: event.city,
                                title: event.title,
                                address: event.address,
                                description: event.description,
                                mapLat: event.mapLat,
                                mapLong: event.mapLng,
                                host: hostInfo,
                                startDate: event.startDate,
                                endDate: event.endDate
                            })
                        }
                    })
                }
            })
        } else{
            return res.status(404).json("event not found"); 
        } 
    })
})

//deletes and event based on its id
//throws and error if the event does not exist
router.delete("/delete/:pinId", (req, res) => {

    Event.findOne({pinId: req.params.pinId}).then(event => {
        if(event){
            Event.deleteOne({pinId: req.params.pinId}, (err, obj) => {
                if (err){
                    res.status(400).json(err);
                  } else{
                      res.json({pinId: req.params.pinId})
                  }  
            })
        }else{ 
            return res.status(404).json("Event not found"); 
             
        }
    })
})

//returns all events
//To save space, these events don't host info or attendee info
//When a user selects a specific event, we can use a get :id request to get more info
router.get('/', (req, res) => {
    Event.find({}, (err, events) => {
        res.json(events)
    })
  }) 


//returns an event
//throws and error if the event does not exist or the events host does not exist
//if there are attendees, returns the host's info and each attendees info
//if there are no attendees, returns only the hosts info
router.get("/:pinId", (req, res) => {
    Event.findOne({pinId: req.params.pinId}).then(event => {
        if(!event){
            return res.status(404).json("Event not found"); 
        }

        User.findOne({email: event.hostEmail}).then(host=> {
            if(!host){
                return res.status(404).json("Host not found"); 
            }
    
            const hostInfo = {
                id: host.id,
                username: host.username,
                email: host.email,
                firstName: host.firstName,
                lastName: host.lastName
            }

            if (event.attendeesEmail){
                User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1, email: 1})
                .then(attendees => {
                    res.json({ 
                        id: event.id,
                        pinId: event.pinId,
                        title: event.title,
                        city: event.city,
                        address: event.address,
                        description: event.description,
                        mapLat: event.mapLat,
                        mapLong: event.mapLng,
                        host: hostInfo, 
                        attendees: attendees,
                        startDate: event.startDate,
                        endDate: event.endDate 
                    })
                })
            }else{
                res.json({
                    id: event.id,
                    pinId: event.pinId,
                    title: event.title,
                    city: event.city,
                    address: event.address,
                    description: event.description,
                    mapLat: event.mapLat,
                    mapLong: event.mapLng,
                    host: hostInfo,
                    startDate: event.startDate,
                    endDate: event.endDate
                })
            }
           
        }).catch(err => res.send(err)); 
    }).catch(err => res.send(err))
 
})



module.exports = router;