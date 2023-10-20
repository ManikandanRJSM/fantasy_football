const asynHandler = require('express-async-handler')
const userModel = require('../Models/User')
const leagueModel = require('../Models/League')


const creatLeague = asynHandler( async (req, res) => {
    return await res.status(400).json('league creation.')
})

module.exports = { creatLeague }