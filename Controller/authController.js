const db = require("../db")
const _ = require("lodash")
const constants = require("../constant")
const {sendResponse, hashPassword, comparePassword} = require("../helper")

const Login = async (req, res) => {    
    var QWhere = {email : req.body.email}
    db.get().collection("users").find(QWhere).toArray().then(async userData => {
        isValid = false
        if(!_.isEmpty(userData)){
            isValid = await comparePassword(req.body.password, userData[0].password)
        }
        return await sendResponse(res, isValid, constants.USER_LOGIN_SUCCESS, constants.USER_LOGIN_ERROR);
    })
}

const Signup = async (req, res) => {
    var QWhere = {email : req.body.email}
    const hashes = await hashPassword(req.body.password)
    db.get().collection("users").find(QWhere).toArray().then(async data => {
        if (data.length >= 1) {
            return await sendResponse(res, [], '', constants.USER_SIGNUP_ERROR);
        } else {
            QWhere = {...QWhere, password: hashes}
            db.get().collection("users").insertOne(QWhere).then(async db_response => {
                return await sendResponse(res, db_response.insertedCount, constants.USER_SIGNUP_SUCCESS, '');
            })
        }
    })
}

module.exports = {
    Login,
    Signup
}