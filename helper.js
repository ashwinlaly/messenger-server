const bcrypt = require("bcrypt"),
      dotenv = require("dotenv"),
      _ = require("lodash")

dotenv.config()

exports.hashPassword = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(pass, salt)
        return password
    } catch (error) {
        console.log("Password Hash Error", error)
    }
}

exports.comparePassword = async (password, db_password) => {
    try {
        return await bcrypt.compare(password, db_password).then(result => result)
    } catch (error) {
        console.log("Password Compare Error", error)
    }
}

exports.errorFormatter = ({location, msg, param, value, nestedErrors}) => {
    return { msg, param }
}

exports.sendResponse = async (response, resultant, success_message, error_message) => {
    if(!_.isEmpty(resultant) || resultant >= 1) {
        return await response.status(200).json({message: success_message, code : 200, data: resultant})
    } else {
        return await response.status(202).json({message: error_message, code : 202})
    }
}