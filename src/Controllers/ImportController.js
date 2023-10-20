const asynHander = require('express-async-handler')
const axios = require('axios')

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

    return res.status(200).json(fpl.elements)
})

module.exports = { fetchPlayers }