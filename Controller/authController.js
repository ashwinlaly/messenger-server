const db = require("../db")
const constants = require("../constant")
const {sendResponse} = require("../helper")

const Login = (req, res) => {
    var QWhere = {email : req.body.email, password : req.body.password}
    var _where = {'$match': QWhere, '$project': {'_id': 1, 'email': 1}}
    db.get().collection("users").aggregate(_where).toArray().then(async data => {
        return await sendResponse(res, data, constants.USER_LOGIN_SUCCSS, constants.USER_LOGIN_ERROR);
    })
}

const Signup = (req, res) => {
    
    res.status(200).json({message: "sucess", code : 200})
}

module.exports = {
    Login,
    Signup
}