const erroHandler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 5000
    response.status(statusCode)
    response.json({
        message : error.message,
        stack   : error.stack
    })

}
module.exports = { erroHandler }