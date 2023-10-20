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

    body("password")
    .notEmpty()
    .withMessage("Password required")
    .isString()
    .withMessage("Password be string"),

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

const validateLogin = [

    body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage('Provide Valid Email')
    .isString()
    .withMessage("Email be string"),

    body("password")
    .notEmpty()
    .withMessage("Password required")
    .isString()
    .withMessage("Password be string"),
]


const validateCreateLeague = [

    body("league_name")
    .notEmpty()
    .withMessage("League Name required")
    .isString()
    .withMessage("League Name be string"),
]

module.exports = { validateSignUp, validateLogin, validateCreateLeague }