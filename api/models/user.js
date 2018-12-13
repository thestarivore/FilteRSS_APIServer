var db=require('../dbconnection'); //reference of dbconnection.js
var bigInt = require("big-integer");
const crc64 = require("crc64-ecma182");

var user={
  /*************************************************************
   *                          FEEDS
   *************************************************************/
  getFeedsOfUser:function(u, callback){
    return db.query("SELECT f.id, f.title, f.description, f.link, f.website, f.subscribers, f.content_type, f.cover_url, "+
                            "f.icon_url, f.visual_url, f.logo_url, f.cover_color, f.category, f.lang, f.popolarity "+                          
                              "FROM user AS u "+ 
                              "JOIN multifeed AS mf ON mf.user=u.id "+
                              "JOIN feed_grouping AS fg ON fg.multifeed=mf.id "+
                              "JOIN feed AS f ON f.id=fg.feed "+
                              "WHERE u.email = ? ", [u.email], callback);
  },
  getFeedGroupsOfUser:function(u, callback){
    return db.query("SELECT fg.* FROM feed_grouping AS fg JOIN multifeed AS m ON fg.multifeed = m.id "+
                    "WHERE m.user = ?", [u.userId], callback);
  },
  getFeedMultifeedCheckpoint:function(fg, callback){
    return db.query("SELECT a.* FROM feed_grouping AS fg JOIN article AS a ON fg.article_checkpoint = a.hash_id "+ 
                    "WHERE fg.feed = ? AND fg.multifeed = ?", [fg.feed, fg.multifeed], callback);
  },
  addFeedMappedToMultifeed:function(u, callback){
    return db.query("INSERT INTO feed_grouping(feed, multifeed) VALUES (?,?)", [u.feed, u.multifeed], callback);
  },
  updateCheckpointArticleOfUserFeed:function(u, callback){
    //First convert data to integer
    var feed = parseInt(u.feed);
    var multifeed = parseInt(u.multifeed);
    var article = bigInt(u.article);
    return db.query("UPDATE feed_grouping SET article_checkpoint=? WHERE feed=? AND multifeed=?", 
                              [article.toString(), feed, multifeed], callback);
  },
  deleteUserFeed:function(u, callback){
    return db.query("DELETE FROM feed_grouping WHERE feed=? AND multifeed=?", [u.feed, u.multifeed], callback);
  },
  
  /*************************************************************
   *                        MULTIFEEDS
   *************************************************************/
  getMultifeedsOfUser:function(u, callback){
    return db.query("SELECT mf.id, mf.title, mf.user, mf.color "+
                              "FROM user AS u "+ 
                              "JOIN multifeed AS mf ON mf.user=u.id "+
                              "WHERE u.email = ? ", [u.email], callback);
  },
  addMultifeed:function(u, callback){
    return db.query("INSERT INTO multifeed(title, user, color) VALUES (?,?,?)", [u.title, u.user, u.color], callback);
  },
  deleteUserMultifeed:function(u, callback){
    return db.query("DELETE FROM multifeed WHERE id=?", [u.id], callback);
  },
  /*************************************************************
   *                        COLLECTIONS
   *************************************************************/
  getCollectionsOfUser:function(u, callback){
    return db.query("SELECT c.id, c.title, c.user, c.color "+
                              "FROM user AS u "+ 
                              "JOIN collection AS c ON c.user=u.id "+
                              "WHERE u.email = ? ", [u.email], callback);
  }, 
  addCollection:function(u, callback){
    return db.query("INSERT INTO collection(title, user, color) VALUES (?,?,?)", [u.title, u.user, u.color], callback);
  },
  deleteUserCollection:function(u, callback){
    return db.query("DELETE FROM collection WHERE id=?", [u.id], callback);
  },
  /*************************************************************
   *                         ARTICLES
   *************************************************************/
  getArticlesOfFeed:function(a, callback){
    return db.query("SELECT * FROM `article` WHERE feed = ?", [a.feed], callback);
  }, 
  getArticlesOfUserCollection:function(c, callback){
    return db.query("SELECT a.* FROM article AS a JOIN saved_article AS sa ON a.hash_id = sa.article "+ 
                                "JOIN collection AS c ON sa.collection = c.id "+
                                "WHERE c.id = ?", [c.id], callback);
  }, 
  getReadArticles:function(ra, callback){
    return db.query("SELECT * FROM read_article WHERE user = ?", [ra.user], callback);
  }, 
  addArticle:function(a, callback){
    //Compute CRC64-ECMA182 Hash function on the string composed of the Article's Title and Publication Date
    var hash_id_array = crc64.crc64(a.title.toString() + a.pub_date.toString());
    var hash_id_str = crc64.toUInt64String(hash_id_array);

    //Conversion from unsigned 64-bit Integer to signed 64-bit Integer
    var hash_id = parseInt(bigInt(hash_id_str).toString())-9223372036854775807;

    return db.query("INSERT INTO article(hash_id, title, description, comment, link, img_link, pub_date, user, feed) "+
                            "VALUES (?,?,?,?,?,?,?,?,?)", 
                            [hash_id, a.title, a.description, a.comment, a.link, a.img_link, a.pub_date, a.user, a.feed], 
                            callback);
  },
  addSavedArticle:function(sa, callback){
    var article = bigInt(sa.article);

    return db.query("INSERT INTO saved_article(article, collection) VALUES (?,?)", 
                            [article.toString(), sa.collection], 
                            callback);
  },
  addReadArticle:function(ra, callback){
    var article = bigInt(ra.article);

    return db.query("INSERT INTO read_article(user, article, vote) VALUES (?,?,?)", 
                            [ra.user, article.toString(), ra.vote], 
                            callback);
  },
  deleteArticle:function(a, callback){
    return db.query("DELETE FROM article WHERE hash_id=?", [a.hash_id], callback);
  },
  deleteSavedArticle:function(sa, callback){
    return db.query("DELETE FROM saved_article WHERE article=? AND collection=?", [sa.article, sa.collection], callback);
  },
  deleteReadArticle:function(ra, callback){
    return db.query("DELETE FROM read_article WHERE user=? AND article=?", [ra.user, ra.article], callback);
  },
};
module.exports=user;
