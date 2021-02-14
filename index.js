const { constants } = require("buffer");
const express = require("express")
    app = express(),
    dotenv = require("dotenv"),
    http = require("http").Server(app),
    bodyParser = require("body-parser"),
    io = require("socket.io")(http),
    constant = require("./constant"),
    db = require("./db");

const routes = require("./routes/route")();

dotenv.config()

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
    response.status(404).json({
        message: "Invalid Url",
        code : 404
    })
})

let PORT = process.env.PORT || 1234

db.connect((STATUS) => {
    if(STATUS == constant.CONNETION_SUCCESS) {
        http.listen(PORT, () => {
            console.log("Application running", PORT)
        })
    }
})