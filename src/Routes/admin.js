const express = require('express')
const route = express()
const { login } = require('../Controllers/AdminController')
express.Router()

route.get('/', (req, res) => {
    res.status(200)
    console.log('this is admin landing api')
    res.end('this is admin landing api')
    
})

route.post('/login', login)


module.exports = route