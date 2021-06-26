var express = require('express');
var router = express.Router();
var userController= require('./daily-fetch');
router.get('/fetch-data',userController.fetchData);
module.exports = router;