
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide name'],
        maxlength: [200, 'Above maxlength']
    },
    email: {
        type: String,
        required: [true, 'Provide Email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Provide password'],
    },
    management: {
        type: Boolean,
        default: false
    },
    liked:{
        type: String,
        value:[String]
    }
})

Schema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

Schema.methods.comparePassword = async function (cPass) {
    const isMatch = await bcrypt.compare(cPass, this.password)
    return isMatch
}

module.exports = mongoose.model('userData', Schema)