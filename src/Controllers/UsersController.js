const { genPass, checkUserEmail }   = require('../Utils/helper')
const asynHandler   = require('express-async-handler')
const userModel     = require('../Models/User')
const {validationResult} = require('express-validator');
const { sendMailEmmiter } = require('../Utils/sendMail');
const { generateJWT } = require('../Utils/helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const signUp = asynHandler( async (request, response, error) => {
    

    try {
        const validateData = validationResult(request)
        
        const {first_name, last_name, email, dob} = request.body
        const hashedPwd = await genPass(request.body.password)

        if(!validateData.isEmpty()){
            return response.status(400).json({status_code : 0, message : 'Validation Error', errors : validateData.array()})
        }
        
        const insertUser = await userModel.create({
            first_name : first_name,
            last_name : last_name,
            email : email,
            password : hashedPwd,
            dob : dob,
            isVerified : false
        })
        
        if(insertUser){
            
            sendMailEmmiter.emit('accountActivationMailer', insertUser)
            return response.status(200).json('User created check the email for verfication.')
        }
        else{
            response.status(400)
            throw Error (error)
        }

        
    } catch (error) {
        throw Error(error);
    }
    
})

const accountActivation = asynHandler(async (request, response) => {

    const id = request.params.id
    const userData = await userModel.findOneAndUpdate({_id: id}, {isVerified : true})
    if(!userData){
        return response.status(400).json({status_code : 0, message : 'User not found', data : {} })
    }
    return response.status(200).json({status_code : 1, message : 'Account Activated', data : {} })

})

const userLogin = asynHandler( async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({email : email})
        const checkPwd = await bcrypt.compare(password, user.password)
        if(!user || !checkPwd){
            return res.status(400).json({status_code : 0, message : 'Email or password not found'})
        }
        const token = await generateJWT(user._id, 'User')
        return res.status(200).json({status_code : 1, message : 'Logged in', token : token})
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})

module.exports = { signUp, accountActivation, userLogin }