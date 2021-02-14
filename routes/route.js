const express = require("express"),
      routes = express.Router();

// Validation Rules
const {loginValidator} = require("../middleware/validators/loginValidator")

const AuthRoute = require("../Controller/authController")

module.exports = (function() {
    routes.post("/login", loginValidator, AuthRoute.Login)
    routes.post("/sigin", AuthRoute.Siginin)
    return routes;
})