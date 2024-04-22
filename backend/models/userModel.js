const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// when we create molels with mongoose, they automatically come with methods like create, find, findOne and delete that we can use. we also can make our own
// because we are using this.findOne arrow function won't work and we should use regualr function
// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    //using validator package
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    
    //here we should use this instead of User
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // hashing password (by bcrypt package)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    // add the record(doc) to the db
    const user = await this.create({ email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)