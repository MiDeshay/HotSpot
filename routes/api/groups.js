const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Group = require('../../models/Group');

// Validations
const validateGroupInput = require('../../validation/group');
const validateGroupMembers = require('../../validation/group-members');
const validateGroupEvents = require('../../validation/group-events');


router.get("/test", (req, res) => res.json({ msg: "This is the groups route" }));


router.post('/create', (req, res) => {
  const { errors, isValid } = validateGroupInput(req.body);
  console.log(req);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Group.findOne({name: req.body.name}) // check if group name taken
  .then(group => {
    if (group){
      errors.name = 'Group name taken';
      return res.status(400).json(errors);
    } else { // if group name is not taken, check if user id is valid
      User.findById(req.body.ownerId)
      .then(user => {
        if (!user) {
          // errors.id = 'Could not verify owner';
          errors.id = 'Could not verify owner';
          return res.status(400).json(errors);
        } else { // if user is valid
          const newGroup = new Group({
            name: req.body.name,
            description: req.body.description,
            ownerId: req.body.ownerId,
            members: [user.id],
            events: []
          });
          newGroup.save().then(group => {
            res.json(group);
          });
        }
      }).catch(err => res.send(err));
    }
  }).catch(err => res.send(err));
});


router.get('/:groupName', (req, res) => {
  // req.body.description = "dummy description"; // to use the same validator
  // const { errors, isValid } = validateGroupInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  console.log(req.params.groupName)

  Group.findOne({name: req.params.groupName})
  .then(group => {
    if (!group) {
      return res.status(404).json("Group not found");
    }
    res.json(group);
  })
});

router.get('/', (req, res) => {
  Group.find({}, {
    name: 1,
    id: 1,
    members: 1,
    events: 1
  }, (err, groups) => {
      res.json(groups)
  })
})


router.delete('/:groupId/:ownerId', (req, res) => {
  console.log(req);
  const errors = {};
  Group.findById(req.params.groupId)
  .then(group => {
    if (!group || group.id !== req.params.groupId) {
      errors.group = 'Failed to find group';
      return res.status(400).json(errors);
    } else {
      User.findById(req.params.ownerId)
      .then(user => {
        if (!user || user.id !== group.ownerId) {
          errors.owner = 'You are not the group owner';
          return res.status(400).json(errors);
        } else {
          Group.findByIdAndDelete(req.params.groupId, err => {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res.json(req.params.groupId);
            }
          })
        }
      })
    }
  })
})

router.patch('/members', (req, res) => {
  // res.json({ msg: "This is the groups add_member route" })
  const errors = {};
  Group.findById(req.body.groupId)
  .then(group => {
    if (!group) {
      errors.owner = 'Failed to find group';
      return res.status(400).json(errors);
    } else {
      const { errors, isValid } = validateGroupMembers({group, memberId: req.body.memberId, isAdding: Boolean(req.body.isAdding === 'true')});
      if (!isValid) {
        return res.status(400).json(errors);
      }
      ///new adding group to users groups
        if (!user){
          return res.status(400).json("User not found")
        } else{
          let { members } = group;
          if (Boolean(req.body.isAdding === 'true')) {
            members.push(req.body.memberId);
          } else {
            let memberIndex = members.indexOf(req.body.memberId);
            if (memberIndex > -1) {
              members.splice(memberIndex, 1);
            }
          }
          Group.findByIdAndUpdate(req.body.groupId, {
            members: members
          }, {new: true}, (error, group) => {
            if (error) {
              res.status(400).json(error);
            } else {
              group = Object.assign(group, {members});
              res.json(group);
            }
          })
        }



      
    }
  })
})

router.patch('/events', (req, res) => {
  const errors = {};
  Group.findById(req.body.groupId)
  .then(group => {
    if (!group) {
      errors.owner = 'Failed to find group';
      return res.status(400).json(errors);
    } else {
      const { errors, isValid } = validateGroupEvents({group, eventId: req.body.eventId, isAdding: Boolean(req.body.isAdding === 'true')});
      if (!isValid) {
        return res.status(400).json(errors);
      }
      let { events } = group;
      if (Boolean(req.body.isAdding === 'true')) {
        events.push(req.body.eventId);
      } else {
        let eventIndex = events.indexOf(req.body.eventId);
        if (eventIndex > -1) {
          events.splice(eventIndex, 1);
        }
      }
      Group.findByIdAndUpdate(req.body.groupId, {
        events: events
      }, {new: true}, (error, group) => {
        if (error) {
          res.status(400).json(error);
        } else {
          group = Object.assign(group, {events});
          res.json(group);
        }
      })
    }
  })
})




module.exports = router;
