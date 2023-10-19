const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    first_name : {
        type : String,
        required : [true, 'Please enter first name'],
    },
    last_name : {
        type : String,
        required : [true, 'Please enter last name'],
    },
    email : {
        type : String,
        required : [true, 'Please enter email'],
        unique : [true, 'Email alredy taken']
    },
    password : {
        type : String,
        required : [true, 'Please enter password'],
    },
},{timestamp : true})

module.exports = mongoose.model('adminModel',  adminSchema, 'admin')