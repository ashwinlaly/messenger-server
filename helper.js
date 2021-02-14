exports.errorFormatter = ({location, msg, param, value, nestedErrors}) => {
    return { msg, param }
}

exports.sendResponse = async (response, resultant, success_message, error_message) => {
    if(resultant.length >= 1) {
        return await response.status(200).json({message: success_message, code : 200, data: resultant})
    } else {
        return await response.status(202).json({message: error_message, code : 202})
    }
}