const asynHandler = require('express-async-handler')
const teamsModel = require('../Models/Teams')
const playersModel = require('../Models/Players')
const { validationResult } = require('express-validator')
const { playersHelper } = require('../Utils/helper')

const showPlayers = asynHandler( async (req, res) => {

    try {
        const validateData = validationResult(req)
        const { position, page } = req.query
        // const perPage = 5 facet concept
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
        res.status(200).json({status_code : 1, message : "Players lists", data : players})
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})


const addPlayer = asynHandler( async (req, res) => {
    try {
        const validateData = validationResult(req)
        const { playersArr } = req.body
        let remainingBudget = 100
        let teamArr = [];
        let checkUsertm = await teamsModel.find({userId : req.authUser._id})
        if(!checkUsertm){
            remainingBudget = checkUsertm.remainingBudget
            teamArr = checkUsertm.gwTeam
        }
        let sameTm = false
        // let chekGkp = await playersHelper(playersArr[0].GK, 'GKP')
        // let chekDef = await playersHelper(playersArr[0].DEF, 'DEF')
        // let chekMid = await playersHelper(playersArr[0].MID, 'MID')
        // let chekFwd = await playersHelper(playersArr[0].FWD, 'FWD')
        const insertTm = await teamsModel.create({
            userId : req.authUser._id,
            gameWeek : 1,
            gwPoints : 0,
            gwTeam : playersArr,
            remainingBudget : 0.00,
            totalBudget : '100',
            freeTransfer : 0,
            isFreeTransfer : false,
        })

        return res.status(200).json({status_code : 1, message : "team update", data : insertTm})
    } catch (error) {
        res.status(400)
        throw new Error (error)
    }
})

const createTeam = asynHandler( async (req, res) => {
    res.status(200).json('New team create with 100m budget')
})

const updateTeam = asynHandler( async (req, res) => {
    res.status(200).json('Update with 100m budget')
})

module.exports = { createTeam, updateTeam, showPlayers, addPlayer }