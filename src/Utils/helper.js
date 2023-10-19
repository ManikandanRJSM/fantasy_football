const jwt           = require('jsonwebtoken')
const asynHandler   = require('express-async-handler')
const bcrypt        = require('bcrypt')
const userModel     = require('../Models/User')

const generateJWT = asynHandler( async (payload, user_type = null) => {
    let user = user_type;
    if(user_type){
        user = 'Admin'
    }else{
        user = 'User'
    }
    return await jwt.sign({id : payload, user_type : user}, process.env.JWT_SECRET, {
        expiresIn : process.env.TTL
    })
})

const genPass = asynHandler( async (password) => {
    const gensalt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, gensalt)
})

const checkUserEmail = asynHandler( async (email) => {
    const isEmail = await userModel.find({email : email})
    return (isEmail) ? true : false
})



module.exports = { generateJWT, genPass, checkUserEmail }