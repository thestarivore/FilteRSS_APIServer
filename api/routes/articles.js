var express = require('express');
var router = express.Router();
var articles=require('../models/articles');


//Get a score for an article
router.get('/score/:articleHashId', function (req, res) {
    articles.getScore(req.params.articleHashId, function(err,rows){
        if(err)
            res.json(err);
        else
            res.json(rows);//or return rows
    });
});

//Get scores for articles
router.get('/scores', function (req, res) {
    articles.getScores(req, function(err,rows){
        if(err)
            res.json(err);
        else
            res.json(rows);//or return rows
    });
});

module.exports = router;
