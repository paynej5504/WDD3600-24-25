//import statements
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

//create express app
const app = express();

//control where files get stored
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        //add date to image name
        //.replace is only needed for Windows computers
        // Macs should run fine with just new Date().toISOString()
      cb(null, new Date().toISOString().replace(/:/g,'-') + '-' + file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
    //image types that are accepted
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ) {
        // if valid return true
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//initialize body parser
app.use(bodyParser.json()); //application/json
app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single('image')
);
// construct path to images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// set headers
app.use((req, res, next) => {
    // add a new header and allow access from any client
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // allow request to continue
});

//forward any incoming requests to feedRoutes
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    // in case undefined, take 500
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    // return a response with status code that was extracted
    res.status(status).json({message: message, data: data});
});

// establish a connection to mongoDb
mongoose.connect(
    //MongoDB connection string goes here
).then(result => {
    //open on localhost:8000
    app.listen(8000);
})
.catch(err => console.log(err));
