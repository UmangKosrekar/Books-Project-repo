
const CustomAPIError = require('./customApiError')
class UnauthorizationError extends CustomAPIError{
    constructor(msg) {
        super(msg)
        this.statusCode = 401
    }
}

module.exports = UnauthorizationError