const asynHandler       = require('express-async-handler')
const bcrypt            = require('bcrypt')
const adminSchema       = require('../Models/Admin')
const { generateJWT }   = require('../Utils/helper')


const login = asynHandler( async (request, response) => {
    const { email, password } = request.body
    
    // const salt = await bcrypt.genSalt(10)
    // const pwd = await bcrypt.hash(password, salt)
    const admin_auth = await adminSchema.findOne({email : email})
    
    const compare = await bcrypt.compare(password, admin_auth.password)
    if(!admin_auth || !compare){
        response.status(400).json({status : 0, message : 'Invalid Credential'})
    }
    
    const token = await generateJWT(admin_auth._id)

    const data = {
        _id : admin_auth._id,
        email : email,
        token : token,
    }
    response.status(200).json({ status_code : 1, message : 'Loggedin', data : data })
})

module.exports = { login }