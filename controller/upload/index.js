const express = require("express");
const router = express.Router();
const {dataInput} = require('./upFileController');
router.post('/upload', (req, res) => {
    return dataInput(req,res)

})
module.exports = router
