//import statements
const { validationResult } = require('express-validator/check');
const fs = require('fs');
const path = require('path');

const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2; // 2 items per page
    let totalItems; //total items in database
    Post.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            //find all posts
            return Post.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage); //limit amount of items on page
        })
        .then(posts => {
            //posts fetched
            res.status(200)
            .json({
                message: 'Fetched posts successfully.', 
                posts: posts, 
                totalItems: totalItems
            });
        })
        .catch(err => {
            // check if error has a status code field
            if (!err.statusCode) {
                //if does not exist set status code to 500
                err.statusCode = 500;
            } 
            next(err);
        });
    
        
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    // if not empty, there are errors
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        // if no image throw error
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    // get title and content
    const title = req.body.title;
    const content = req.body.content;
    let creator;

    const post = new Post({
        // pass title, content, image url, and creator
        title: title, 
        content: content,
        imageUrl: imageUrl,
        creator: req.userId
    });
    // save to database
    post.save().then(result => {
        User.findById(req.userId);
    })
    .then(user => {
        //list current user as creator
        creator = user;
        user.posts.push(post); 
        return user.save();
    })
    .then(result => {
        // create post in db
        // tell client resource was successfully created
        res.status(201).json({
            message: 'Post created successfully!',
            post: post,
            creator: {_id: creator._id, name: creator.name}
        });
    })
    .catch(err => {
        // check if error has a status code field
        if (!err.statusCode) {
            //if does not exist set status code to 500
            err.statusCode = 500;
        } 
        next(err);
    });
};

exports.getPost = (req, res, next) => {
    //extract post id
    const postId = req.params.postId;
    //find post with same id
    Post.findById(postId)
        .then(post => {
            //if no post was found throw error
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404; //not found status code
                throw error;
            }
            // if successful send success message and get post
            res.status(200).json({message: 'Post fetched.', post: post});
        })
        .catch(err => {
            // check if error has a status code field
            if (!err.statusCode) {
                //if does not exist set status code to 500
                err.statusCode = 500;
            } 
            next(err);
        });
};

exports.updatePost = (req, res, next) => {
    //extract post id 
  const postId = req.params.postId;
  const errors = validationResult(req);
  // if there are errors send an error message
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  //check if file and image url are equal
  if (req.file) {
    imageUrl = req.file.path;
  }
  // if image url is not set throw error
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      //check if id matches logged in user
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // if image url's are not equal, pass old path as an argument
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      //update the post title, image, and content
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      // save updated post
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
    //extract post id
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            //if post does not exist throw error
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
              }
              //check if id matches logged in user
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
      }
            //clear post
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId);
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            //id of post you want to remove
            user.posts.pull(postId);
            return user.save();
        })
        .then(result => {
            //success message once post is deleted
            res.status(200).json({message: 'Deleted post.'});
        })
        .catch(err => {
            //error if trouble deleting
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

//delete image
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}