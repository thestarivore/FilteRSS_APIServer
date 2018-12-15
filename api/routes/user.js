var express = require('express');
var router = express.Router();
var user=require('../models/user');

/*************************************************************
 *                          FEEDS
 *************************************************************/
//Get all User's Feeds 
router.get('/feeds',function(req, res){
    if(req.query){
        user.getFeedsOfUser(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Get all User's FeedGroups
router.get('/feeds/group',function(req, res){
    if(req.query){
        user.getFeedGroupsOfUser(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Get the checkpoint of the User's Feed-Multifeed (Founded in FeedGrouping)
router.get('/feeds/checkpoint',function(req, res){
    if(req.query){
        user.getFeedMultifeedCheckpoint(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Put/Add a Feed mapped to a User's Multifeeds 
router.put('/feeds',function(req, res){
    if(req.body){
        user.addFeedMappedToMultifeed(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Update the Checkpoint Article of the Feed associated with the User's Multifeed 
router.patch('/feeds/checkpoint',function(req, res){
    if(req.body){
        user.updateCheckpointArticleOfUserFeed(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Delete User's Feed mapped to a User's Multifeed
router.delete('/feeds',function(req, res){
    if(req.body){
        user.deleteUserFeed(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

/*************************************************************
 *                        MULTIFEEDS
 *************************************************************/
//Get all User's Multifeeds 
router.get('/multifeeds',function(req, res){
    if(req.query){
        user.getMultifeedsOfUser(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Put/Add a Multifeed associated with the user 
router.put('/multifeeds',function(req, res){
    if(req.body){
        user.addMultifeed(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Delete User's Multifeed
router.delete('/multifeeds',function(req, res){
    if(req.body){
        user.deleteUserMultifeed(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});


/*************************************************************
 *                        COLLECTIONS
 *************************************************************/
//Get all User's Collections 
router.get('/collections',function(req, res){
    if(req.query){
        user.getCollectionsOfUser(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Put/Add a Collections associated with the user 
router.put('/collections',function(req, res){
    if(req.body){
        user.addCollection(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Delete User's Collection
router.delete('/collections',function(req, res){
    if(req.body){
        user.deleteUserCollection(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});


/*************************************************************
 *                         ARTICLES
 *************************************************************/
//Get all Feed's Articles 
router.get('/articles',function(req, res){
    if(req.query){
        user.getArticlesOfFeed(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Get all User's Articles of a specific Collection
router.get('/articles/saved',function(req, res){
    if(req.query.id){
        user.getArticlesOfUserCollection(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else if(req.query.userId){
        user.getSavedArticlesOfUser(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Get all User's Read Articles 
router.get('/articles/read',function(req, res){
    if(req.query){
        user.getReadArticles(req.query,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Save an Article associated with the User and Feed 
router.put('/articles',function(req, res){
    if(req.body){
        user.addArticle(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Save an Article to the User's Collection
router.put('/articles/saved',function(req, res){
    if(req.body){
        user.addSavedArticle(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Save a ReadArticle (A User has read an Article)
router.put('/articles/read',function(req, res){
    if(req.body){
        user.addReadArticle(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Delete Feed's Article
router.delete('/articles',function(req, res){
    if(req.body){
        user.deleteArticle(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Delete Collection's Saved Article (not deleting the actual article but rather the instance of saved_article table)
router.delete('/articles/saved',function(req, res){
    if(req.body){
        user.deleteSavedArticle(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

//Delete a ReadArticle (A User has read an Article)
router.delete('/articles/read',function(req, res){
    if(req.body){
        user.deleteReadArticle(req.body,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

module.exports = router;
