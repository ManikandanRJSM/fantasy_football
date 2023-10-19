const express = require('express')
const route = express()
express.Router()

route.get('/', (req, res) => {
    res.status(200)
    console.log('Welcome to FPL')
    res.end('Welcome to FPL')
})

module.exports = route