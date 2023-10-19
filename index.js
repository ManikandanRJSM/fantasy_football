const express           = require('express')
const dotenv            = require('dotenv').config()
const { dbCon }         = require('./src/Config/database')
const { erroHandler }   = require('./src/Middleware/errorHandler')
const port              = process.env.PORT

dbCon()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))


// define routes
app.use('/', require('./src/Routes/common'))
app.use('/admin', require('./src/Routes/admin'))
app.use('/api', require('./src/Routes/api'))

app.use(erroHandler)

app.listen(port, () => {
    console.log(`server running in ${port}`)
})