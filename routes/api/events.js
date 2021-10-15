const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Event = require('../../models/Events')
const validateEventInput = require("../../validation/event")

const upload = require('../../services/post_image');
const singleUpload = upload.single('image');
const deleteImage = require("../../services/delete_image")
const deleteImages = require("../../services/delete_images")


router.patch('/change_cover_picture/:eventId', (req, res) => {
    Event.findById(req.params.eventId).then(event => {
        if(!event){
            return res.status(404).json("Event not found");
        } else {
            singleUpload(req, res, (error) => {
                if (error){
                    return res.status(404).json(error);
                }else{
                    if(event.coverPictureKey){
                        deleteImage(event.coverPictureKey)
                    }
                    Event.findByIdAndUpdate( req.params.eventId, {
                        coverPictureKey: req.file.key
                    }, {new: true}, (error, event) => {
                        
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
                                        endDate: event.endDate,
                                        eventPicturesKeys: event.eventPicturesKeys,
                                        coverPictureKey: event.coverPictureKey 
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
                                    endDate: event.endDate,
                                    eventPicturesKeys: event.eventPicturesKeys,
                                    coverPictureKey: event.coverPictureKey  
                                })
                            }
                        })
                    })
                }


            })
        }
    })
})

router.patch('/add_picture/:eventId', (req, res) => {
    Event.findById(req.params.eventId).then(event => {
        if(!event){
            return res.status(404).json("Event not found");
        } else {
            singleUpload(req, res, (error) => {
                if (error){
                    return res.status(404).json(error);
                }else{
                    Event.findByIdAndUpdate( req.params.eventId, 
                        {$push: {eventPicturesKeys: req.file.key}}, {new: true}, (error, event) => {
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
                                            endDate: event.endDate,
                                            eventPicturesKeys: event.eventPicturesKeys,
                                            coverPictureKey: event.coverPictureKey  
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
                                        endDate: event.endDate,
                                        eventPicturesKeys: event.eventPicturesKeys,
                                        coverPictureKey: event.coverPictureKey  
                                    })
                                }
                            })
                        }
                    })
                }


            })
        }
    })
})


//send the key of the picture to be deleted in the body under key named "imageKey"

router.patch('/remove_picture/:eventId', (req, res) => {
    Event.findById(req.params.eventId).then(event => {
        if(!event){
            return res.status(404).json("Event not found");
        } else {
            if(req.body.imageKey){
                deleteImage(req.body.imageKey)
            }
            Event.findByIdAndUpdate( req.params.eventId, 
                {$pull: {eventPicturesKeys: req.body.imageKey}}, {new: true}, (error, event) => {
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
                                    endDate: event.endDate,
                                    eventPicturesKeys: event.eventPicturesKeys,
                                    coverPictureKey: event.coverPictureKey  
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
                                endDate: event.endDate,
                                eventPicturesKeys: event.eventPicturesKeys,
                                coverPictureKey: event.coverPictureKey  
                            })
                        }
                    })
                }
            })
            
        }
    })
})


//Can be used by both current user and event host to add users from events

//takes an email as a request and an event id in the params, 
//adds the email to an events list of attendee emails
//throws an error if the event doesn't exist or email is already on the attendee email list
//returns the event with its attendees information
router.patch("/join_event/:eventId", (req, res) => {
    Event.findById(req.params.eventId).then(event => {
        if (!event){
            return res.status(404).json("Event not found"); 
        }else{ 
            User.findOne({email: req.body.email}).then(user => {
                if (user){
                    if(event.attendeesEmail.includes(user.email)){
                        res.status(404).json("You are already registered for this event.");  
                    }else{
                        Event.findByIdAndUpdate(req.params.eventId, 
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
                                                city: event.city,
                                                title: event.title,
                                                address: event.address,
                                                description: event.description,
                                                mapLat: event.mapLat,
                                                mapLng: event.mapLng,
                                                host: hostInfo, 
                                                attendees: attendees,
                                                startDate: event.startDate,
                                                endDate: event.endDate,
                                                eventPicturesKeys: event.eventPicturesKeys,
                                                coverPictureKey: event.coverPictureKey    
                                            })
                                        })
                                    }else{
                                        res.json({
                                            id: event.id,
                                            city: event.city,
                                            title: event.title,
                                            address: event.address,
                                            description: event.description,
                                            mapLat: event.mapLat,
                                            mapLng: event.mapLng,
                                            host: hostInfo,
                                            startDate: event.startDate,
                                            endDate: event.endDate,
                                            eventPicturesKeys: event.eventPicturesKeys,
                                            coverPictureKey: event.coverPictureKey   
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
router.patch("/decline_event/:eventId", (req, res) => {
    Event.findById(req.params.eventId).then(event => {
        if (!event){
            return res.status(404).json("Event not found"); 
        } else {
            User.findOne({email: req.body.email}).then(user => {
                if (user){
                    if(!event.attendeesEmail.includes(user.email)){
                        res.status(404).json("You are already unregistered for the event");  
                    }else{
                        Event.findByIdAndUpdate(req.params.eventId, 
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
                                                city: event.city,
                                                title: event.title,
                                                address: event.address,
                                                description: event.description,
                                                mapLat: event.mapLat,
                                                mapLng: event.mapLng,
                                                host: hostInfo, 
                                                attendees: attendees,
                                                startDate: event.startDate,
                                                endDate: event.endDate,
                                                eventPicturesKeys: event.eventPicturesKeys,
                                                coverPictureKey: event.coverPictureKey    
                                            })
                                        })
                                    }else{
                                        res.json({
                                            id: event.id,
                                            city: event.city,
                                            title: event.title,
                                            address: event.address,
                                            description: event.description,
                                            mapLat: event.mapLat,
                                            mapLng: event.mapLng,
                                            host: hostInfo,
                                            startDate: event.startDate,
                                            endDate: event.endDate,
                                            eventPicturesKeys: event.eventPicturesKeys,
                                            coverPictureKey: event.coverPictureKey   
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
        endDate: req.body.endDate,
    })
    
    
    User.findOne({email: newEvent.hostEmail}).then(host=> {
      if(!host){
         return res.status(404).json("Host not found"); 
      }
      newEvent.host.push(host);
      Group.findById(req.body.groupId).then( group => {
         newEvent.group = group;
         newEvent.save().then(event => {
            res.json(event);
         }).catch(err => res.send(err)); 
      }).catch(err => res.send(err));
      
   })
        
})  

//Updates event based on event params shown below
//Updates an event based on event params
//throws errors if new [startDate, endDate, title, description, city, address, or hostEmail ] params are blank
//throws errors if new title is longer than [60] characters 
//throws errors if new event is longer than [400] characters

//returns the updated event with host info and attendees info if there are any
router.patch("/:eventId", (req, res) => {
    
    const {errors, isValid} = validateEventInput(req.body)
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Event.findById(req.params.eventId).then( event => {
        if(event){
            
            Event.findOneAndUpdate({title: event.title}, {
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
                    Group.findById(req.body.groupId).then( group => {event.group = group; event.save();}).then( 
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
                                       city: event.city,
                                       title: event.title,
                                       address: event.address,
                                       description: event.description,
                                       mapLat: event.mapLat,
                                       mapLng: event.mapLng,
                                       host: hostInfo, 
                                       attendees: attendees,
                                       startDate: event.startDate,
                                       endDate: event.endDate,
                                       eventPicturesKeys: event.eventPicturesKeys,
                                       coverPictureKey: event.coverPictureKey   
                                 })
                              })
                           }else{
                              res.json({
                                 id: event.id,
                                 city: event.city,
                                 title: event.title,
                                 address: event.address,
                                 description: event.description,
                                 mapLat: event.mapLat,
                                 mapLng: event.mapLng,
                                 host: hostInfo,
                                 startDate: event.startDate,
                                 endDate: event.endDate,
                                 eventPicturesKeys: event.eventPicturesKeys,
                                 coverPictureKey: event.coverPictureKey   
                              })
                           }
                     })
                    ).catch(err=> res.status(400).json(err))
                }
            })
        } else{
            return res.status(404).json("event not found"); 
        } 
    })
})

//deletes and event based on its id
//throws and error if the event does not exist
router.delete("/delete/:eventId", (req, res) => {
    Event.findById(req.params.eventId).then(event => {
        if(event){
            if(event.coverPictureKey){
                deleteImage(event.coverPictureKey)
            }

            if(event.eventPicturesKeys){
                const obj = []
                event.eventPicturesKeys.map( imgKey => {
                    obj.push({Key: imgKey})
                })

                deleteImages(obj)
            }

    
            Event.findByIdAndDelete(req.params.eventId, (err, obj) => {
                if (err){
                    return res.status(400).json(err);
                  } else{
                    return res.json({id: req.params.eventId})
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
   Event.find({}).populate('host').populate('group', 'name').exec( (err, events) => {
      //res.json(events)
      let result = {}
      Object.values(events).forEach( (event, i) => {
         result[event._id] = event;
      })
      
      return res.json(result);
   })
}) 


//returns an event
//throws and error if the event does not exist or the events host does not exist
//if there are attendees, returns the host's info and each attendees info
//if there are no attendees, returns only the hosts info
router.get("/:eventId", (req, res) => {
    Event.findById(req.params.eventId).then(event => {
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
                        title: event.title,
                        city: event.city,
                        address: event.address,
                        description: event.description,
                        mapLat: event.mapLat,
                        mapLng: event.mapLng,
                        host: hostInfo, 
                        attendees: attendees,
                        startDate: event.startDate,
                        endDate: event.endDate ,
                        eventPicturesKeys: event.eventPicturesKeys,
                        coverPictureKey: event.coverPictureKey   
                    })
                })
            }else{
                res.json({
                    id: event.id,
                    title: event.title,
                    city: event.city,
                    address: event.address,
                    description: event.description,
                    mapLat: event.mapLat,
                    mapLng: event.mapLng,
                    host: hostInfo,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    eventPicturesKeys: event.eventPicturesKeys,
                    coverPictureKey: event.coverPictureKey   
                })
            }
           
        }).catch(err => res.send(err)); 
    }).catch(err => res.send(err))
 
})



module.exports = router;