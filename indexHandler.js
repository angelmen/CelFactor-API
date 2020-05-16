const express = require("express")
var router = express.Router()


router.get("/", function (req, res, next) {
    res.status(200).json("hola")
})


module.exports = router