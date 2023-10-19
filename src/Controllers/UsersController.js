const { genPass, checkUserEmail }   = require('../Utils/helper')
const asynHandler   = require('express-async-handler')
const userModel     = require('../Models/User')
const {validationResult} = require('express-validator');
const { accountActivationMailer } = require('../Utils/sendMail');
const mongoose = require('mongoose')


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
            await accountActivationMailer(insertUser)
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

module.exports = { signUp, accountActivation }