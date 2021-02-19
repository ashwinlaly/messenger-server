const io = require("socket.io")(http);
const db = require("./db");
let _socket;

io.on("connection", (socket) => {

    const pipeline = {$match: {operationType: "insert"}} // Watch only for the new messages
    let userStream = db.get().collection("users").watch([pipeline])
    userStream.on("change", (next) => {
        console.log(next)
    })

    let messageStream = db.get().collection("messages").watch([pipeline])
    messageStream.on("change", (next) => {
        console.log(next)
    })


    _socket = socket
    _socket.on("pong", (data) => {
        _socket.emit("ping", {data})
    })
})