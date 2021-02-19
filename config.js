require("dotenv").config()

let resource = {
    "development": {
        DB : `mongodb+srv://messenger:${process.env.MONGO_DB_PASSWORD}@cluster0.9ov2a.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    },
    "production" : {
        DB : ""
    }
}

version = resource[process.env.VERSION]
module.exports = {version}