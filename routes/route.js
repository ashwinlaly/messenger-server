const express = require("express"),
      routes = express.Router();

// Validation Rules
const {loginValidator} = require("../middleware/validators/loginValidator")
const {sigupValidator} = require("../middleware/validators/sigupValidator")

const {verifyToken} = require("../middleware/helper/authHelper");

const authController = require("../Controller/authController")
const userController = require("../Controller/userController")
const messageController = require("../Controller/messageController")

module.exports = (function() {
    routes.post("/login", loginValidator, authController.Login)
    routes.post("/signup", sigupValidator, authController.Signup)
    routes.get("/logout", [verifyToken], authController.Logout)

    routes.get("/messages/all", [verifyToken], messageController.getAllMessages)
    routes.get("/messages", [verifyToken], messageController.getUserMessages)
    routes.get("/message/:id", [verifyToken], messageController.getUserMessage)
    routes.post("/message", [verifyToken], messageController.createMessage)

    routes.get("/user/profile", [verifyToken], userController.myProfile)
    return routes;
})