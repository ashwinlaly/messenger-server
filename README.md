Package to Install:

-> npm i socket.io --s
-> npm i dotenv --s
-> npm i jsonwebtoken --s
-> npm i express --s
-> npm i mongo --s
-> npm i body-parser --s
-> npm i mongodb --s
-> npm i --save express-validator --s
-> npm i bcrypt --s


db.users.aggregate([
    {
        $lookup:{
            from : "messages",
            pipeline: [
                {$match : { status : 1}}, 
                {$project : { _id:0, user_id:0}}
            ],
            as : "messages"
        }
    }
])