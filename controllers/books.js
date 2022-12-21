
const database = require('../models/books')
const { BadRequestError, UnauthorizationError } = require('../errors')

var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const store = localStorage.getItem('user')
var isManagement = localStorage.getItem('management')

const getAll = async (req, res) => {
    const { title, author, ageReq, category } = req.query
    const queryObject = {}

    if (ageReq) {
        queryObject.ageReq = ageReq
    }
    if (category) {
        queryObject.category = category
    }
    if (title) {
        queryObject.name = {$regex: title, $options: 'i'}
    }
    if(author) {
        queryObject.author = {$regex: author, $options: 'i'}
    }
    console.log(queryObject)
    const data = await database.find(queryObject)
    res.json({nbHits: data.length, data})
}


const createOne = async (req, res) => {
    var { title, ageReq, category, author } = req.body
    if (!title || !category) {
        throw new BadRequestError('Title and category required')
    }
    if (typeof localStorage.getItem('user') === 'undefined' || localStorage.getItem('user') == null) {
        throw new BadRequestError('Login id not avalible')
    }
    if (!author) {
        author = localStorage.getItem('user')
    }
    const data = await database.create({ title: title, ageReq: ageReq, category: category, author: author, createdBy: localStorage.getItem('user') })
    console.log(localStorage.getItem('user'), data.createdBy)
    res.json(data)
}


const getOne = async (req, res) => {
    const { id: id } = req.params
    const data = await database.find({ _id: id })
    res.json(data)
}


const deleteOne = async (req, res) => {
    const { id: id } = req.params

    console.log(localStorage.getItem('management'))
    if (localStorage.getItem('management') == 'true') {
        console.log('management on')
        await database.deleteOne({ _id: id })
        return res.json(await database.find({}))
    }

    if (typeof localStorage.getItem('user') === 'undefined' || localStorage.getItem('user') == null) {
        throw new BadRequestError('Login id not avalible')
    }
    const data = await database.findOne({ _id: id })
    if (localStorage.getItem('user') != data.createdBy) {
        throw new UnauthorizationError('U cannot delete this')
    }
    console.log(localStorage.getItem('user'), data.createdBy)
    const temp = await database.findOneAndDelete({ _id: id })
    console.log(temp)
    res.json(await database.find({}))
}


const updateOne = async (req, res) => {
    const { id: id } = req.params
    const { title, ageReq, category, author, feedback } = req.body

    if (!title && !ageReq && !category && !author && !feedback) {
        throw new BadRequestError('Nothing to update')
    }

    if (localStorage.getItem('management') == 'true') {
        console.log('management on')
        await database.findOneAndUpdate(
            { _id: id }, req.body, {
            new: true,
            runValidators: true,
        })
        return res.json({ msg: 'done' })
    }

    if (typeof localStorage.getItem('user') === 'undefined' || localStorage.getItem('user') == null) {
        throw new BadRequestError('Login id not avalible')
    }
    const data = await database.findOne({ _id: id })
    if (localStorage.getItem('user') != data.createdBy) {
        throw new UnauthorizationError('U cannot update this')
    }

    await database.findOneAndUpdate(
        { _id: id }, req.body, {
        new: true,
        runValidators: true,
    })
    return res.json({ msg: 'done' })
}


module.exports = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    updateOne
}