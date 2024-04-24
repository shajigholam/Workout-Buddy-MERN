const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers   //in the headers there is authorization property that contains jwt

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET) // it returns the payload and we grab the _id from it

        // finding that user, selecting just its _id prop from db and attach the _id to the req so we have it attached to the req when we go to the next controller funcs
        req.user = await User.findOne({_id}).select('_id')

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth