var db=require('../dbconnection'); //reference of dbconnection.js

var articles={
  getScore:function(article_hash_id, callback){
    return db.query("SELECT Score FROM `article_stats_view` WHERE `article` = ?", [article_hash_id], callback);
  },

  // Get scores for a given array of hash_id. The scores are returned in the same order as the hash_ids are provided
  getScores:function(req, callback){
    return db.query("SELECT `article`, `score` FROM `article_stats_view` WHERE `article` IN (?) ORDER BY FIELD(`article`, ?)", 
                    [req.body.ids, req.body.ids], callback);
  },
};
module.exports=articles;
