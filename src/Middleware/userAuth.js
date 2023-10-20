const jwt = require('jsonwebtoken')
const asynHandler = require('express-async-handler')
const userModel = require('../Models/User')


const userAuth = asynHandler ( async (req, res, next) => {

    try {

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            const token = req.headers.authorization.split(' ')[1]
            try {
                const verify = await jwt.verify(token, process.env.JWT_SECRET)
                req.userData = await userModel.findOne({id : verify.id}).select('-password')
                next()
            } catch (error) {
                return res.status(401).json({status_code : 0, message : 'Request Not Authorized'})
            }
            
        }else{
            return res.status(401).json({status_code : 0, message : 'Request Not Authorized'})
        }
        
    } catch (error) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    
})


module.exports = { userAuth }