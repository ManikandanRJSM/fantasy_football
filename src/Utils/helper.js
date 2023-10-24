const jwt           = require('jsonwebtoken')
const asynHandler   = require('express-async-handler')
const bcrypt        = require('bcrypt')
const userModel     = require('../Models/User')
const playersModel = require('../Models/Players')

const generateJWT = asynHandler( async (payload, user_type = null) => {
    let user = user_type;
    if(!user_type){
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


const playersHelper = asynHandler( async (playerIds, postion) => {
    let maxPlayers = 3
    if(postion === "GKP"){
        maxPlayers = 2
    }
    const playerMap = playerIds.map((arr) => {
        return arr.playerId
    })
    const plData = await playersModel.find({_id : { "$in" :  playerMap}})
    console.log(plData)
    
    return {
        status : true,
        message : `More than ${maxPlayers} Arsenal players are not allowed`,
        data : plData
        
    }
})



module.exports = { generateJWT, genPass, checkUserEmail, playersHelper }