//import statements
const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

//create router
const router = express.Router();

//GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
    '/post',
    isAuth, 
    [
        // trim whitespace and set minimum length for title and content
        body('title')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5})
    ], 
    feedController.createPost
);

//post route with a certain id
router.get('/post/:postId', isAuth, feedController.getPost);

router.put(
    '/post/:postId',
    isAuth,
    [
        // trim whitespace and set minimum length for title and content
        body('title')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5})
    ],
    feedController.updatePost
);

// delete route
router.delete('/post/:postId', isAuth, feedController.deletePost);

//export router
module.exports = router;