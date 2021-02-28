const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const auth = asyncHandler( async (req,res,next)=>{
    const {authToken} = req.cookies;
    if (!authToken){
        res.status(401)
        throw new Error('Not Authorized!')
    }
    const token = authToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if(decoded){
        req.userId = decoded.userId;
        next()
    }else{
        res.status(401);
        throw new Error('Not Authorized!');
    }
})

module.exports = auth;