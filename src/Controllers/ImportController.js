const asynHander = require('express-async-handler')
const axios = require('axios')
const fs = require('fs')
const playersModel = require('../Models/Players')
const plTeams = require('../Models/PlTeams')

let status = 0;
const fetchPlayers = asynHander( async (req, res) => {
    const fpl = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/')
    .then(res => {
        status = 1;
        return Promise.resolve(res.data)
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });
    // get only current players in the league
    const players = fpl.elements.filter( (player) => {
        return player.status === 'a';
    })

    for(const team of fpl.teams){
        const insertTeams = await plTeams.create({
            fplId : team.id,
            code : team.code,
            draw : team.draw,
            form : team.form,
            loss : team.loss,
            name : team.name,
            short_name : team.short_name,
            strength : team.strength,
            pulse_id : team.pulse_id,
        })
    }
    
    for(const player of players){
        let element_type = await fpl.element_types.filter( (element_types) => { return element_types.id === player.element_type; })
        
        const insertPlayer = await playersModel.create({
            fplId : player.id,
            first_name : player.first_name,
            element_type : element_type[0].id,
            plural_name : element_type[0].plural_name,
            plural_name_short : element_type[0].plural_name_short,
            singular_name : element_type[0].singular_name,
            singular_name_short : element_type[0].singular_name_short,
            squad_select : element_type[0].squad_select,
            squad_min_play : element_type[0].squad_min_play,
            squad_max_play : element_type[0].squad_max_play,
            last_name : player.second_name,
            web_name : player.web_name,
            now_cost : player.now_cost,
            team_code : player.team_code,
            total_points : player.total_points,
        })
    }
    // await playersModel.insertMany(players)
    // const playerFile = fs.createWriteStream(process.env.JSON_PATH)
    return res.status(200).json(fpl.teams)
})

module.exports = { fetchPlayers }