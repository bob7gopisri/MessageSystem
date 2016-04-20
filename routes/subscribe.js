var express = require('express');
var router = express.Router();
var models = require('../published_messages.js');
var published_message = models.published_message;




router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
