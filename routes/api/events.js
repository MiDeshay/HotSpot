const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Event = require('../../models/Events')
const validateEventInput = require("../../validation/event")

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
        attendeesEmail: req.body.attendeesEmail,
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
        // const attendees = User.find({id: {$in: event.attendeeIds}})

        if (event.attendeesEmail){
            User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1})
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
     })
        
})  

router.patch("/:id", (req, res) => {
    const {errors, isValid} = validateEventInput(req.body)
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Event.findOne({id: req.params.id}).then( event => {
        if(event){
            Event.findOneAndUpdate({id: req.params.id}, {
                pinId: req.body.pinId,
                address: req.body.address, 
                city: req.body.city,
                hostEmail: req.body.hostEmail,
                title: req.body.title,
                description: req.body.description,
                attendeesEmail: req.body.attendeesEmail,
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
                        // const attendees = User.find({id: {$in: event.attendeeIds}})
                
                        if (event.attendeesEmail){
                            User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1})
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

router.delete("/:id", (req, res) => {
    Event.findOne({id: req.params.id}).then(event => {
        if(event){
            Event.deleteOne({id: req.params.id}, (err, obj) => {
                if (err){
                    res.status(400).json(err);
                  } else{
                      res.json({id: req.params.id})
                  }  
            })
        }else{ 
            return res.status(404).json("Event not found"); 
             
        }
    })
})

router.get('/', (req, res) => {
    Event.find({}, (err, events) => {
        res.json(events)
    })
  }) 

router.get("/:id", (req, res) => {
    Event.findOne({id: req.params.id}).then(event => {
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
                User.find({email: {$in: event.attendeesEmail}}, {_id: 1, username: 1, firstName: 1, lastName: 1})
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