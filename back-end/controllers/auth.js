// import statements
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.signup = (req, res, next) => {
    // get email, name, password
    const errors = validationResult(req);
    //check for errors
    if (!errors.isEmpty()) {
        //throw new error if validation failed
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    // use bcrypt to protect password
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                name: name
            })
            return user.save(); //save to database
        })
        .then(result => {
            res.status(201).json({message: 'User created!', userId: result._id});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    //retrieve email, password
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    // find user that matches the email
    User.findOne({email: email})
        .then(user => {
            // if user is not defined throw error
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            // if wrong password is entered
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // create a new signature
            const token = jwt.sign({
                //user's email and id
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
            }, 'secret', {
                expiresIn: '1h'
            });
            res.status(200).json({token: token, userId: loadedUser._id.toString()});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}