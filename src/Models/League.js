const mongoose = require('mongoose')

const leagueModel = mongoose.Schema({
    league_name : {
        type : String,
        required : [true, 'League Name Required']
    },
    standings : {
        type : Array,
        default : []
    },
    // created_by : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'user'
    // }
},{ timestamp : true })

module.exports = mongoose.model('leagueModel', leagueModel, 'leagues')