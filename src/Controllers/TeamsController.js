const asynHandler = require('express-async-handler')
const teamsModel = require('../Models/Teams')

const createTeam = asynHandler( async = (req, res) => {
    res.status(200).json('New team create with 100m budget')
})

const updateTeam = asynHandler( async = (req, res) => {
    res.status(200).json('Update with 100m budget')
})

module.exports = { createTeam, updateTeam }