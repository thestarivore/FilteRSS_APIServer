var express = require('express');
var router = express.Router();
var articles=require('../models/articles');

//Get a score for an article
router.get('/score/:articleHashId', function (req, res) {
    articles.getScore(req.params.articleHashId, function(err,rows){
        if(err)
            res.json(err);
        else {
            // Return "Score":0 if the article has not stats
            if(rows.length == 0){
                res.json({"Score":0});
            } else {
                res.json(rows[0]);//or return the score
            }
        }
    });
});

//Get scores for articles
router.post('/scores', function (req, res) {
    //console.log(req.body);
    articles.getScores(req, function(err,rows){
        if(err)
            res.json(err);
        else {
            console.log(rows);
            res.json(rows);//or return rows
        }
    });
});

module.exports = router;
