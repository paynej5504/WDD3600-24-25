//import statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a new user schema
//schema includes email, password, name, status, and posts
//email, password, and name is required
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        //plugged into database
        default: 'I am new!'
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

//export user schema
module.exports = mongoose.model('User', userSchema);