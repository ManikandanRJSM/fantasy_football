const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const teamsModel = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    gameWeek : {
        type : Number,
        required : [true, 'Gameweek field is requried']
    },
    gwPoints : {
        type : Number,
        required : [true, 'Gameweek points field is requried']
    },
    gwTeam : {
        type : Array,
        default : []
    },
    remainingBudget : {
        type : mongoose.Schema.Types.Decimal128,
    },
    totalBudget : {
        type : Number,
        default: '100'
    },
    freeTransfer : {
        type : Number,
        required : [true, 'Free Transfer field is requried']
    },
    isFreeTransfer : {
        type : Boolean,
        default: false
    }
}, {timestamp : true})

module.exports = mongoose.model('teamsModel', teamsModel, 'teams')