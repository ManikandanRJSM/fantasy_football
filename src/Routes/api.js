const express = require('express')
const route = express()
const { signUp, accountActivation, userLogin } = require('../Controllers/UsersController')
const { creatLeague } = require('../Controllers/LeagueController')
const { createTeam, updateTeam } = require('../Controllers/TeamsController')
const { fetchPlayers } = require('../Controllers/ImportController')
const { validateSignUp, validateLogin, validateCreateLeague } = require('../Middleware//Validators/apiValidator')
const { userAuth } = require('../Middleware/userAuth')

express.Router()

route.get('/', (req, res) => {
    res.status(200)
    console.log('User landing route')
    res.end('User landing route')
    
})

route.post('/signUp', validateSignUp, signUp)

route.get('/activateAccount/:id', accountActivation)

route.post('/userLogin', validateLogin, userLogin)

route.post('/creatLeague', userAuth, validateCreateLeague, creatLeague)

route.post('/createTeam', userAuth, createTeam)

route.post('/updateTeam', userAuth, updateTeam)

route.get('/importPlayers', fetchPlayers)

module.exports = route