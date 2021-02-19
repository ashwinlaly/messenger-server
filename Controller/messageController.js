const _ = require("lodash"),
    constants = require("../constant"),
    db = require("../middleware/helper/databaseHelper"),
    ObjectID = require("mongodb").ObjectID,
    {sendResponse} = require("../middleware/helper/responseHelper");


const getAllMessages = async (req, res) => {
    // var QWhere = {status : 1}
    // db.get().collection("messages").find(QWhere).toArray().then(async data => {
    //     return await sendResponse(res, user_token, constants, constants);
    // })
}

const createMessage = async (req, res) => {
    let {to, message} = req.body
    user_id = ObjectID(req.user_id)
    message = {to,message, status: 1, user_id}
    fields = {_id : false}
    db.insertOne("messages", message, fields).then(data => {
        return sendResponse(res, data, constants.MESSAGE_CREATION_SUCCESS)
    }).catch(error => {
        return sendResponse(res, '', '', constants.MESSAGE_CREATION_ERROR)
    })
}

const getUserMessages = () => {
    // db.select("messages", )
}

const getUserMessage = () => {

}


const generateAPIKey = () => {

}

const removeAPIKey = () => {

}

module.exports = {
    getAllMessages,
    getUserMessages,
    getUserMessage,
    generateAPIKey,
    removeAPIKey,
    createMessage
}