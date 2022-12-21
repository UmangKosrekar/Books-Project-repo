
const CustomAPIError = require('./customApiError')
class NotFoundError extends CustomAPIError{
    constructor(msg) {
        super(msg)
        this.statusCode = 404
    }
}

module.exports = NotFoundError