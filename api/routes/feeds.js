var express = require('express');
var router = express.Router();
var feeds=require('../models/feeds');

//Get All Feeds or those filtered by search content
router.get('/',function(req, res){
    if(req.query.search){
        feeds.getFeedsByContent(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else{
        feeds.getAllFeeds(function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }
        });
    }
});

//Post a Feed
router.post('/',function(req,res,next){
    feeds.addFeed(req.body,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
 });

module.exports = router;
