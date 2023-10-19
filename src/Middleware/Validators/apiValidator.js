const {check, validationResult, body} = require('express-validator');
const asynHandler = require('express-async-handler')
const userModel = require('../../Models/User')

const validateSignUp = [
    body("first_name")
    .notEmpty()
    .withMessage("First name required")
    .isString()
    .withMessage("First name should be string"),

    body("last_name")
    .notEmpty()
    .withMessage("Last name required")
    .isString()
    .withMessage("Last name should be string"),

    body("dob")
    .notEmpty()
    .withMessage("Last name required")
    .toDate()
    .withMessage("Enter Valid Date"),

    body("email")
    .custom(async email => {
        const checkEmail = await userModel.findOne({email : email})
        if(checkEmail){
            return Promise.reject("E-mail already in use");
        }
    })
    .notEmpty()
    .withMessage("Last name required")
    .isEmail()
    .withMessage('Provide Valid Email')
    .isString()
    .withMessage("Last name should be string"),
]

module.exports = { validateSignUp }