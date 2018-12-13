var express = require('express');
var router = express.Router();
var categories=require('../models/categories');


//Get all categories
router.get('/', function (req, res) {
    categories.getAll(function(err,rows){
        if(err)
            res.json(err);
        else
            res.json(rows);//or return rows
    });
});

module.exports = router;
