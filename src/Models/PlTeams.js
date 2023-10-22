const mongoose = require('mongoose')

const plTeams = mongoose.Schema({
    code : {
        type : Number
    },
    fplId : {
        type : Number
    },
    draw : {
        type : Number
    },
    form : {
        type : Number
    },
    loss : {
        type : Number
    },
    name : {
        type : String
    },
    short_name : {
        type : String
    },
    strength : {
        type : Number
    },
    pulse_id : {
        type : Number
    },
},{timestamp : true})

module.exports = mongoose.model('plTeams', plTeams, 'pl_teams')