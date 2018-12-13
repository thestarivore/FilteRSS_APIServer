var db=require('../dbconnection'); //reference of dbconnection.js

var auth={
  login:function(auth, callback){
    return db.query("SELECT * FROM user WHERE email=? and password=?",[auth.email, auth.password],callback);
  },
  registration:function(reg, callback){
    return db.query("INSERT INTO user(name, surname, email, password) VALUES (?,?,?,?)",[reg.name,reg.surname,reg.email,reg.password],callback);
  },
  updatePassword:function(user,callback){
    return db.query("UPDATE user SET email=?, password=? WHERE email=?",[user.email,user.password,user.email],callback);
  }
};
module.exports=auth;
