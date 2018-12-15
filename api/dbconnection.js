var mysql=require('mysql');
/*var connection=mysql.createPool({
    host:'rssfeedreaderdb.ccgv0rcochau.eu-west-3.rds.amazonaws.com',
    user:'admin',
    password:'rssreader',
    database:'my_rssfeedrepository',
    supportBigNumbers: true,                //Otherwise 64-bit numbers get truncated during the queries
    bigNumberStrings: true
});*/
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_rssfeedrepository",
  supportBigNumbers: true, //Otherwise 64-bit numbers get truncated during the queries
  bigNumberStrings: true
});
module.exports = connection;
