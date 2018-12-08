const DB_Accounts = require('../models/accounts');
const router = require('express').Router();


// /accounts/userinfo 
router.get('/userinfo', (req, res) => {
    res.send("data")
});



module.exports = router;