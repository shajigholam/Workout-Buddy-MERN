const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const cerateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = cerateToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'login user'})
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        // added to the db
        const user = await User.signup(email, password)

        // create a token
        const token = cerateToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'signup user'})
}

module.exports = { loginUser, signupUser }

/**
 * JWT
 * a way that the backend API can communicate with the frontend React app is by using JWT
 * to manage the authentication between the frontend and backend of the web app by making special tokens called JWT by the server
 * JWT is made up-> Header: contains the algorithm used for the JWT, payload: contains non-sensitive user data, signature: used to verify the token by the server
 * when the user enter their credentials, header and payload with a secret string(only for the server) that is made up by the server will hashed together -> the result is a signature(process is called signing the token)
 * the signature will be added to the JWT as the 3rd part
 * so whenever we send a request to get accesss to a resource that needs authentication we send the JWT along with it and the server will
 * decode the header and payload then create a signature using secret and these two and compare & match it with the signature in JWT to verify the authentication
 */