var express = require("express");
var router = express.Router();
const connection = require("../conn");
const mysql = require("mysql2")

router.post("/savetable", function(req, res) {
    res.json("funkar");
})

module.exports = router;