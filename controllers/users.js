
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const database = require('../models/users')
const register = async (req, res) => {
    const { name, email, password, management } = req.body
    if (!name || !email || !password) {
        res.send('provide details')
    }
    const tempData = { name, email, password }
    if (management == 'sure') {
        tempData['management'] = true
    }
    const data = await database.create(tempData)
    res.json(data)
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.send('provide details')
    }
    const data = await database.findOne({ email })
    const correctPassword = await data.comparePassword(password)
    if (!correctPassword) {
        return res.send('invalid')
    }
    localStorage.setItem('user', email)
    localStorage.setItem('management', data.management)
    console.log(localStorage.getItem('user'), 
    localStorage.getItem('management'))
    res.json(data)
}

module.exports = { login, register }