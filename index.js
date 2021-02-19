require("dotenv").config()
const express = require("express"),
    app = express(),
    http = require("http").Server(app),
    bodyParser = require("body-parser"),
    io = require("socket.io")(http),
    constant = require("./constant"),
    db = require("./db");

const routes = require("./routes/route")();
let _socket;

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, UPDATE, PUT");
    res.setHeader("Access-Control-Allow-Credential", true);
    next()
})

app.use("/api/", routes);

app.all("*", (request, response) => {
    console.log("~ Action -> " + request.connection.remoteAddress +"  " + request.method + " : " + request.url);
    response.status(404).json({message: constant.INVALID_URL, code : 404})
})

io.on("connection", (socket) => {
    _socket = socket

    _socket.on("pong", (data) => {
        _socket.emit("ping", {data})
    })
})

let PORT = process.env.PORT || 1234

db.connect((STATUS) => {
    if(STATUS == constant.CONNETION_SUCCESS) {        
        http.listen(PORT, () => {
            console.log(constant.APPLICAITON_RUNNING, PORT)
        })
    }
})