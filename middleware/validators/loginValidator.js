const {check, validationResult} = require("express-validator")
const {errorFormatter} = require("../helper/responseHelper")

exports.loginValidator = [
    check("email")
        .trim()
        .escape()
        .isEmail()
        .withMessage("Email Cannot be Empty")
        .bail()
        .isLength({min:6, max:50})
        .withMessage("Enter valid Email")
        .bail(),
    check("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Password Cannot be Empty")
        .bail()
        .isLength({min:8, max:15})
        .withMessage("Enter valid Password")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(errorFormatter)
        if(!errors.isEmpty()){
            return res.status(422).json({message: errors.array(),code : 422})
        }
        next()
    }
]