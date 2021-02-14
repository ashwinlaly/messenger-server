const Login = (req, res) => { 
    res.status(200).json({message: "sucess", code : 200})
}

const Siginin = (req, res) => {

    res.status(200).json({message: "sucess", code : 200})
}

module.exports = {
    Login,
    Siginin
}