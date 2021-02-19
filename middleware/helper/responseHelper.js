require("dotenv").config()
const _ = require("lodash");

const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
    return { msg, param }
}

const sendResponse = async (response, resultant, success_message = '', error_message = '') => {
    if(!_.isEmpty(resultant) || resultant >= 1) {
        return await response.status(200).json({message: success_message, code : 200, data: resultant})
    } else {
        return await response.status(202).json({message: error_message, code : 202})
    }
}

module.exports = {
    errorFormatter,
    sendResponse
}