const CustomAPIError = require('./customApiError')
const BadRequestError = require('./badreq')
const UnauthorizationError = require('./unauth')
const NotFoundError = require('./notFound')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthorizationError,
    NotFoundError
}