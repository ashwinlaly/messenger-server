let mongo = require("mongodb").MongoClient
let config = require("./config")
let constant = require("./constant")

let _db;

module.exports = {
    connect : callback => {
        mongo.connect(`${config.version.DB}`, {useUnifiedTopology:true} ,(err, connection) => {
            if(err) {
                console.log("Database Error", err)
                callback(constant.CONNETION_ERROR);
            } else {
                _db = connection
                console.log("Database Connected...")
                callback(constant.CONNETION_SUCCESS);
            }
        })
    },
    get : () => {
        return _db;
    }
}