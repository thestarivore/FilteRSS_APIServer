var express = require('express');
var router = express.Router();
var auth=require('../models/auth');


/*router.get('/login/:email?:password?',function(req,res,next){
    auth.login(req.params.email, req.params.password,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});*/

router.get('/', function (req, res) {
  res.send('GET request to the homepage');
});


//Login POST
router.post('/login', function (req, res) {
    auth.login(req.body, function(err,rows){
        if(err)
            res.json(err);
        else
            res.json(rows);//or return rows
    });
});

//Registration POST
router.post('/registration', function (req, res) {
    auth.registration(req.body, function(err,rows){
        if(err)
            res.json(err);
        else
            res.json(rows);//or return rows
    });
});

//Password Change POST
router.post('/password/change', function (req, res) {
    auth.updatePassword(req.body, function(err,rows){
        if(err)
            res.json(err);
        else
            res.json(rows);//or return rows
    });
});

/*
router.post('/',function(req,res,next){
    Task.addTask(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(req.body);//or return count for 1 &amp;amp;amp; 0
        }
    });
 });*/

module.exports = router;
