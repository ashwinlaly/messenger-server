const express = require("express"),
      routes = express.Router();

// Validation Rules
const {loginValidator} = require("../middleware/validators/loginValidator")
const {sigupValidator} = require("../middleware/validators/sigupValidator")

const AuthRoute = require("../Controller/authController")

module.exports = (function() {
    routes.post("/login", loginValidator, AuthRoute.Login)
    routes.post("/sigup", sigupValidator, AuthRoute.Signup)
    return routes;
})