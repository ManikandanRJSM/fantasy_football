const express = require('express')
const route = express()
const { signUp, accountActivation } = require('../Controllers/UsersController')
const { stripePayments } = require('../Controllers/PaymentsController')
const { validateSignUp } = require('../Middleware//Validators/apiValidator')
express.Router()

route.get('/', (req, res) => {
    res.status(200)
    console.log('User landing route')
    res.end('User landing route')
    
})

route.post('/signUp', validateSignUp, signUp)

route.get('/activateAccount/:id', accountActivation)

route.get('/stripe-payments', stripePayments)

module.exports = route