const express = require("express");
const router = express.Router();
// const User = require('../../models/User');
// const Group = require('../../models/Group');
const GroupJoinRequest = require('../../models/GroupJoinRequest');

router.get("/test", (req, res) => res.json({ msg: "This is the groupJoinRequests route" }));



module.exports = router;