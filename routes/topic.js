var express = require('express');
var router = express.Router();
var models = require('../models');

var topic = models.topic;
var topic_subscription = models.topic_subscription;

/* Create a topic */
router.post('/', function(req, res, next) {

    var topic_name = req.body.topic_name;
    var owner = req.body.owner;


    var response = {};
    topic.findOne({where: {topic_name: topic_name, owner: owner}}).then(function (topic) {
        if (topic !== null) {
            res.send(409, topic);
        } else { // no topic found
            var topic = topic.build({topic_name: topic_name,
               owner: owner });
            topic.save().then(function (topicobj) {
                console.log(topicobj);
                if (topicobj == null) {
                    body = {error_message: "unable to create topic"};
                    res.send(400,body);
                } else {
                    topic.findOne({where: {topic_name: topic_name, owner: owner}}).then(function (topic_obj) {
                        if (topic_obj !== null){
                            res.send(201,topic_obj);
                        }
                        else{
                            body = {error_message: "unable to get the topic"};
                            res.send(400, body);
                        }
                    });
                }
            });
        }
    });
});

/* Create a subscription for a topic */
router.post('/:topic_name/subscribe', function(req, res, next) {

    var topic_name = req.params.topic_name;
    var subscriber_group = req.body.subscriber_group;
    var subscription_owner = req.body.subscription_owner;
    var subscriber_group = req.body.subscription_group;

    var response = {};
    topic.findOne({where: {topic_name: topic_name}}).then(function (topic) {
        if (topic !== null) {
            /* Topic exists.. go ahead an create a subscription */
            var topic_subscription = topic_subscription.build({topic_name: topic_name,
                subscription_owner: subscription_owner,
                subscription_group: subscription_group,
                subscription_status: 1});
            topic_subscription.save().then(function (topic_subscription) {
                console.log(topic_subscription);
                if (topic_subscription == null) {
                    body = {error_message: "unable to create topic subscription"};
                    res.send(400,body);
                } else {
                    topic_subscription.findOne({where: {topic_name: topic_name, subscription_group: subscription_group}}).then(function (topic_sub_obj) {
                        /* Send the Topic subscription */
                        if (topic_sub_obj !== null){
                            res.send(201,topic_sub_obj);
                        }
                        else{
                            body = {error_message: "unable to get the topic subscription"};
                            res.send(400, body);
                        }
                    });
                }
            });
        } else { // no topic found
            res_body = {error_message: "topic not found"};
            res.send(400, res_body);
        }
    });
});

/* Get a topic subscription */
router.get('/:topic_name/subscription/:subscription_group', function(req, res) {
    var topic_name = req.params.topic_name;

    topic_subscription.findOne({where: {topic_name: topic_name, subscription_group:subscription_group }}).then(function (topic_sub_obj) {
        if (topic_sub_obj !== null){
            res.send(200,topic_sub_obj);
        }
        else{
            body = {error_message: "unable to get the topic subscription"};
            res.send(400, body);
        }
    });
});


/* Get a topic by a topic name */
router.get('/:topic_name', function(req, res) {
    var topic_name = req.params.topic_name;

    topic.findOne({where: {topic_name: topic_name}}).then(function (topic_obj) {
        if (topic_obj !== null){
            res.send(200,topic_obj);
        }
        else{
            body = {error_message: "unable to get the topic"};
            res.send(400, body);
        }
    });
});




router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
