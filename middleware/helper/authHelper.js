require("dotenv").config()
const bcrypt = require("bcrypt"),
      _ = require("lodash"),
      constants = require("../../constant"),
      jwt = require("jsonwebtoken");

const hashPassword = async (pass) => {
    try {
        salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(pass, salt)
        return password
    } catch (error) {
        console.log("Password Hash Error", error)
    }
}

const comparePassword = async (password, db_password) => {
    try {
        return await bcrypt.compare(password, db_password).then(result => result)
    } catch (error) {
        console.log("Password Compare Error", error)
    }
}

const accessToken = async (payload) => {
    let {ACCESS_TOKEN_SECRET, ACCESS_ALGORITHM, ACCESS_TOKEN_LIFE} = process.env
    let access_token = await jwt.sign(payload, ACCESS_TOKEN_SECRET, {algorithm : ACCESS_ALGORITHM, expiresIn: _.toInteger(ACCESS_TOKEN_LIFE)})
    let refresh_token = await refreshToken(payload)
    return {access_token, refresh_token}
}

const refreshToken = async (payload) => {
    let {REFRESH_TOKEN_SECRET, ACCESS_ALGORITHM, REFRESH_TOKEN_LIFE} = process.env
    return await jwt.sign(payload, REFRESH_TOKEN_SECRET, {algorithm : ACCESS_ALGORITHM, expiresIn : _.toInteger(REFRESH_TOKEN_LIFE)})
}

const verifyToken = (req, res, next) => {
    let {ACCESS_TOKEN_SECRET} = process.env
    message = constants.INVALID_USER_ACCESS
    try {
        let access_token = req.body.access_token
        if(_.isEmpty(access_token)){
            return res.status(403).send({message, code: 403})
        }
        req.user_id = jwt.decode(access_token)["_id"]
        jwt.verify(access_token, ACCESS_TOKEN_SECRET)
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            message = constants.TOKEN_EXPIRED
        } else if (error.name === "JsonWebTokenError") {
            message = constants.INVALID_TOKEN
        }
        console.log(error)
        return res.status(403).send({message, code: 403})
    }
    next()
}

module.exports = {
    hashPassword,
    comparePassword,
    accessToken,
    refreshToken,
    verifyToken
}