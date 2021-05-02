//import statements
const express = require('express');
const { body } = require('express-validator/check');
const User = require('../models/user');
const authController = require('../controllers/auth');

//create router
const router = express.Router();

//signup route
router.put('/signup', 
    [
        // check if email is a valid email
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        //return if email address is already used
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
            body('password')
                .trim() // trim whitespace
                //password must be at least 5 characters
                .isLength({min: 5}),
            body('name')
                .trim() //trim whitespace
                .not()
                .isEmpty()
    ],
    authController.signup
);

//login route
router.post('/login', authController.login);

//export router
module.exports = router;