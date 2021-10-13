const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Protected Routes
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateEditProfile = require('../../validation/profile');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
      email: req.user.email
    });
  })


router.get("/:userId", (req, res) => {

     User.findById(req.params.userId).then( user => {

        if (!user) {
            return res.status(404).json("User not found");
        }

        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email
            })

     })


})

router.patch("/:userId", (req, res) => {

    const { errors, isValid } = validateEditProfile(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findByIdAndUpdate( req.params.userId,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
        }, {new: true}, (error, user) => {
        if (error){
            res.status(400).json(error);
        }else{
            res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                message: "hello"
            })
        }
    } )
})

router.delete("/:userId", (req,res) => {

      let user = User.findById(req.params.userId).then( user => {
        if (user){
            User.deleteOne({_id: req.params.userId}, (err, obj) => {
                if (err){
                    res.status(400).json(err);
                  } else{
                      res.json({id: req.params.userId})
                  }
              })
          }else{
              return res.status(404).json("User not found");

          }
      })
})



router.get('/', (req, res) => {
    User.find({}, {
        firstName: 1,
        lastName: 1,
        username: 1,
        email: 1,
        id: 1
    }, (err, users) => {
        res.json(users)
    })
})



router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check for duplicate email
	User.findOne({email: req.body.email})
    .then(user => {
        if (user){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            // Create new User
            let nickname = req.body.firstName + req.body.lastName[0];
            const newUser = new User({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               username: nickname,
               email: req.body.email,
               password: req.body.password,
            })
            // Salt and hash password before saving.
            bcrypt.genSalt(10, (err, salt) => {
                // debugger;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                            success: true,
                            token: "Bearer " + token
                            });
                        });

                    })
                    .catch(err => res.send(err));
                })
            })
        }
    })
})

router.post('/login', (req, res) =>{
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {id: user.id, firstName: user.firstName, lastName: user.lastName};

                    jwt.sign(
                        payload,
                        keys.secretOrKey, {expiresIn: 3600},
                        (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                        });
                } else {
                    errors.password = 'Incorrect password'
                    return res.status(400).json(errors);
                }
            })
    })

})

module.exports = router;