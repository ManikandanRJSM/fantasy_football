const mongoose = require('mongoose')

const playersModel = mongoose.Schema({
    fplId : {
        type : Number 
    },
    first_name : {
        type : String 
    },
    last_name : {
        type : String 
    },
    now_cost : {
        type : Number 
    },
    team_code : {
        type : Number 
    },
    total_points : {
        type : Number 
    },
    web_name : {
        type : String
    },
    element_type : {
        type : Number
    },
    plural_name : {
        type : String
    },
    plural_name_short : {
        type : String
    },
    singular_name : {
        type : String
    },
    singular_name_short : {
        type : String
    },
    squad_select : {
        type : Number
    },
    squad_min_play : {
        type : Number
    },
    squad_max_play : {
        type : Number
    }
}, {timestamp : true})

module.exports = mongoose.model('playersModel', playersModel, 'players')