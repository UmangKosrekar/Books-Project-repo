
const { getAll, getOne, createOne, deleteOne, updateOne } = require('../controllers/books')
const express = require('express')
const router = express.Router()

router.route('/').get(getAll).post(createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router