const db = require("../db")
const _ = require("lodash")
const constants = require("../constant")
const {sendResponse} = require("../middleware/helper/responseHelper")
const {hashPassword, comparePassword, accessToken} = require("../middleware/helper/authHelper")

const Login = async (req, res) => {
    var QWhere = {email : req.body.email}
    db.get().collection("users").find(QWhere).toArray().then(async userData => {
        isValid = false
        user_token = ''
        if(!_.isEmpty(userData)){
            isValid = await comparePassword(req.body.password, userData[0].password)
            if(isValid){
                user_token = await accessToken({_id : userData[0]._id, email: userData[0].email})
                await db.get().collection("users").updateOne(QWhere, {$set: {...user_token}})
            }
        }
        return await sendResponse(res, user_token, constants.USER_LOGIN_SUCCESS, constants.USER_LOGIN_ERROR);
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

const Logout = (req, res) => {
    
}

module.exports = {
    Login,
    Signup,
    Logout
}