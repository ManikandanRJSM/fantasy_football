const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    first_name : {
        type : String,
        required : [true, 'Please enter first name']
    },
    last_name : {
        type : String,
        required : [true, 'Please enter last name']
    },
    email : {
        type : String,
        required : [true, 'Please enter Email'],
        // unique : [true, 'Email already taken try different one']
    },
    password : {
        type : String,
        required : [true, 'Please enter the last name'],
    },
    dob : {
        type : Date,
        // required : [true, 'Please enter date of birth'],
    },
    isVerified : {
        type : Boolean,
        default: false
    }

},{timestamp : true})

module.exports = mongoose.model('userModel', userSchema, 'users')