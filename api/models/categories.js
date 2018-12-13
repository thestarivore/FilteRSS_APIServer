var db=require('../dbconnection'); //reference of dbconnection.js

var categories={
  getAll:function(callback){
    return db.query("SELECT * FROM category",callback);
  },
};
module.exports=categories;
