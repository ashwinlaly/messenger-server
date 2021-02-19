require("dotenv").config()
let mongo = require("mongodb").MongoClient,
    config = require("./config"),
    constant = require("./constant"),
    _db;

module.exports = {
    connect : callback => {
        mongo.connect(`${config.version.DB}`, {useUnifiedTopology:true} ,(err, connection) => {
            if(err) {
                console.log("Database Error", err)
                callback(constant.CONNETION_ERROR);
            } else {
                _db = connection.db(process.env.MONGO_DB_NAME)
                console.log("Database Connected...")
                callback(constant.CONNETION_SUCCESS);
            }
        })
    },
    get : () => {
        return _db;
    }
}