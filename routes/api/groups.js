const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Group = require('../../models/Group');

// Validations
const validateGroupInput = require('../../validation/group');
const validateGroupMembers = require('../../validation/group-members');
const validateGroupEvents = require('../../validation/group-events');

//images
const upload = require('../../services/post_image');
const singleUpload = upload.single('image');
const deleteImage = require("../../services/delete_image");

router.post('/create', (req, res) => {
  const { errors, isValid } = validateGroupInput(req.body);
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
            events: [],
            groupJoinRequests: []
          });


          newGroup.save().then(group => {
            user.groupsJoined.push(newGroup);
            user.save();
            return res.json(group);
          });
        }
      }).catch(err => res.send(err));
    }
  }).catch(err => res.send(err));
});

router.post('/create_with_picture', (req, res) => {

    singleUpload(req, res, (error) => {
      if(error){
        return res.status(404).json(error);
      }else{

        Group.findOne({name: req.body.name}) // check if group name taken
        .then(group => {
          if (group){
            return res.status(400).json({error: 'Group name taken'});
          }
        })

        const { errors, isValid } = validateGroupInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
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
                  bannerPictureKey: req.file.key,
                  members: [user.id],
                  events: []
                });

                newGroup.save().then(group => {
                  user.groupsJoined.push(newGroup);
                  user.save();
                  return res.json(group);
                });
              }
            }).catch(err => res.send(err));
      }
      })
  })



router.get('/:groupName', (req, res) => {
  Group.findOne({name: req.params.groupName})
  .then(group => {
    if (!group) {
      return res.status(404).json("Group not found");
    }
    res.json(group);
  });
});

router.get('/', (req, res) => {
  Group.find({}, (err, groups) => {
      res.json(groups);
  });
});


router.delete('/:groupId/:ownerId', (req, res) => {
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
               Event.deleteMany({group: group._id})
               .then( () => res.json(group))
               .catch( err => res.status(400).json(err));
            }
          });
        }
      });
    }
  });
});

router.patch('/:groupName/update', (req, res) => {
  const { errors, isValid } = validateGroupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Group.findByIdAndUpdate(req.body.groupId, {
    name: req.body.name,
    description: req.body.description
  }, {new: true}, (error, group) => {
    if (error) {
      return res.status(400).json(error);
    } else {
      res.json(group);
    }
  });
});

router.patch('/:groupId', (req, res) => {
  Group.findById(req.params.groupId).then(group => {
    if(!group){
      return res.status(404).json("group not found");
  } else {
      singleUpload(req, res, (error) => {
        if(error){
          return res.status(404).json(error);
        }else{
          const { errors, isValid } = validateGroupInput(req.body);
          if (!isValid) {
            return res.status(400).json(errors);
          }

          if(group.bannerPictureKey){
            deleteImage(group.bannerPictureKey)
          }
          Group.findByIdAndUpdate(req.body.groupId, {
            name: req.body.name,
            description: req.body.description,
            bannerPictureKey: req.file.key
          }, {new: true}, (error, group) => {
            if (error) {
              return res.status(400).json(error);
            } else {
              res.json(group);

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
       let { members } = group;

       if (Boolean(req.body.isAdding === 'true')) {
         members.push(req.body.memberId);
         User.findById(req.body.memberId).then( user => {
            user.groupsJoined.push(group);
            user.save(); // Fix later to handle error handling.
         });

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
       });
     }
   });
 });

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
      });
    }
  });
});

router.post('/join_request', (req, res) => { // post because we are posting a groupJoinRequest
  const errors = {};
  Group.findById(req.body.groupId).then(group => {
    if (!group) {
      errors.group = 'Failed to find group';
      return res.status(400).json(errors);
    }
    User.findById(req.body.userId).then(user => {
      if (!user) {
        errors.user = 'Failed to find user';
        return res.status(400).json(errors);
      }
      if (!group.groupJoinRequests) {
        group.groupJoinRequests = [];
      }
      if (group.groupJoinRequests.includes(user._id)) {
        errors.join = 'Join request pending';
        return res.status(400).json(errors);
      }
      group.groupJoinRequests.push(user._id);
      group.save().then(group => {
        res.json({group, user});
      });
    });
  }).catch(err => {
    errors.join = `Failed in /join_request`;
    return res.status(400).json(errors);
  });
});

router.patch('/join_request/response', (req, res) => { // patch because we are changing the data (we are technically deleting it) and we need more info in the request
  const errors = {};
  Group.findById(req.body.groupId).then(group => {
    if (!group) {
      errors.group = 'Failed to find group';
      return res.status(400).json(errors);
    }
    User.findById(req.body.userId).then(user => {
      // removing the userId from the group's groupJoinRequests array (this should happen regardless of case)
      const gjrindex = group.groupJoinRequests.indexOf(req.body.userId);
      if (gjrindex < 0) {
        errors.join = 'Failed to find that request Id';
        return res.status(400).json(errors);
      } else {
        group.groupJoinRequests.splice(gjrindex, 1);
        group.save().then(group => {
          if (!user) { // regular error out if we never found the user
            errors.user = 'Failed to find user';
            return res.status(400).json(errors);
          }
          if (Boolean(req.body.isAdding === 'true')) {
            group.members.push(user);
            user.groupsJoined.push(group);
            user.save();
            group.save().then(group => {
              res.json({ group, user });
            });
          } else {
            res.json({ group, user });
          }
        });
      }
    });
  }).catch(err => {
    errors.join = 'Failed in /join_request/response';
    return res.status(400).json(errors);
  });
});




module.exports = router;
