//import statements
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //check authorization
    const authHeader = req.get('Authorization');
    //if user is not authenticated throw error
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    //split whitespace and get second value in token
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        //check if token is valid
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    // check if undefind
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};