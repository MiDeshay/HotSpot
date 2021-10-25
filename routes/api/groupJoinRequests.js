const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Group = require('../../models/Group');
const GroupJoinRequest = require('../../models/GroupJoinRequest');

router.get("/test", (req, res) => res.json({ msg: "This is the groupsJoinRequest route" }));

module.exports = router;

router.post('/create', (req, res) => {
  Group.findOne({name: req.body.name})
  .then(group => {
    if (group) {
      User.findById({id: req.body.userId})
      .then(user => {
        if (user) {
          const newGroupJoinRequest = new GroupJoinRequest({user,group});
          newGroupJoinRequest.save()
          .then(groupJoinRequest => {
            user.groupJoinRequest.push(newGroupJoinRequest);
            user.save;
          });
        }
      });
    }
  });
});