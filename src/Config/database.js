const mongoose = require('mongoose')
const asyHandler = require('express-async-handler')

const dbCon = asyHandler(async (request, response) => {
    try {
        await mongoose.connect(process.env.DB_URI)
        // response.status(200)
    } catch (error) {
        console.log(error)
        // response.status(400)
        throw new Error(error)
        process.exit(1)
    }
}) 

module.exports = { dbCon }