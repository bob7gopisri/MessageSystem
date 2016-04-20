var express = require('express');
var router = express.Router();
var models = require('../models');
var published_message = models.published_message;


/* Publish the message */
router.post('/', function(req, res, next) {

    var topic_name = req.body.topic_name;
    var message_id = req.body.message_id;
    var message = req.body.message;
    var publisher_id = req.body.publisher_id;


    var response = {};
    published_message.findOne({where: {message_id: message_id, message_status: 1}}).then(function (message) {
        if (message !== null) {
            res.send(409, message);
        } else {
            var message = published_message.build({topic_name: topic_name,
                message_id: message_id, message: message,
                publisher_id: publisher_id });
            message.save().then(function (messageobj) {
                console.log(messageobj);
                if (messageobj == null) {
                    body = {error_message: "unable to publish message"};
                    res.send(400,body);
                } else {
                    published_message.findOne({where: {message_id: message_id}}).then(function (pub_message) {
                        if (pub_message !== null){
                            res.send(201,pub_message);
                        }
                        else{
                            body = {error_message: "unable to publish message"};
                            res.send(400, body);
                        }
                    });
                }
            });
        }
    });
});

router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
