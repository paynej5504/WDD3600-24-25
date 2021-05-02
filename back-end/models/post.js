//import statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new schema
// schema includes title, imageUrl, content, and creator
// all are required 
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    //sets time when created
    { timestamps: true }
);

// create a model based on the schema
module.exports = mongoose.model('Post', postSchema);