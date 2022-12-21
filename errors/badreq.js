
const { model } = require('mongoose')
const CustomAPIError = require('./customApiError')

class BadRequestError extends CustomAPIError{
    constructor(msg) {
        super(msg)
        this.statusCode = 400
    }
}

module.exports = BadRequestError