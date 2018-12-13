var db=require('../dbconnection'); //reference of dbconnection.js

var feeds={
  getAllFeeds:function(callback){
    return db.query("SELECT * FROM feed",callback);  
  },
  getFeedsByCategory:function(filter, callback){
    return db.query("SELECT * FROM feed WHERE category LIKE ?",['%'+filter.category+'%'],callback);
  },
  getFeedsByContent:function(filter, callback){
    if(filter.search && filter.category)
      return db.query("SELECT * FROM feed WHERE category LIKE ? AND (title LIKE ? OR description LIKE ?)",[filter.category,'%'+filter.search+'%','%'+filter.search+'%'],callback);
    if(filter.search)
      return db.query("SELECT * FROM feed WHERE title LIKE ? OR description LIKE ?",['%'+filter.search+'%','%'+filter.search+'%'],callback);
    if(filter.category)
      return db.query("SELECT * FROM feed WHERE category LIKE ?",[filter.category],callback);
    },
  addFeed:function(reg, callback){
    return db.query("INSERT INTO feed(title, link, category, lang) VALUES (?,?,?,?)",[reg.title, reg.url, reg.category, reg.lang],callback);
  },
};
module.exports=feeds;
