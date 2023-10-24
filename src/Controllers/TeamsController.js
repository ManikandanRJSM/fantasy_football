const asynHandler = require('express-async-handler')
const teamsModel = require('../Models/Teams')
const playersModel = require('../Models/Players')
const { validationResult } = require('express-validator')


const showPlayers = asynHandler( async (req, res) => {

    try {
        const validateData = validationResult(req)
        const { position, page } = req.query
        // const perPage = 5
        const players = await playersModel.aggregate([
            {
                $lookup: {
                    from : 'pl_teams',
                    localField : 'team_code',
                    foreignField : 'code',
                    as : 'pl_team'
                }
            },
            {
                $sort : {
                    total_points : -1 // -1 for descending order
                }
            },
            {
                $match : { // similar to where condtion in join query
                    singular_name_short : position.toUpperCase()
                }
            }
        ])
        res.status(200).json(players)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})


const addPlayer = asynHandler( async (req, res) => {
    res.status(200).json('New team create with 100m budget')
})

const createTeam = asynHandler( async (req, res) => {
    res.status(200).json('New team create with 100m budget')
})

const updateTeam = asynHandler( async (req, res) => {
    res.status(200).json('Update with 100m budget')
})

module.exports = { createTeam, updateTeam, showPlayers, addPlayer }