var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'customuser',
  password : 'Vikas#123',
  database : 'ecommerce'
});
connection.connect(function (err) {
    if (err) {
        console.error('could not connect to mysql', err);
    }else{
        console.log('Connected to mysql database');
        // connection.query('select * from registration', function(err,result){
        // 	if(err) throw err;
        // 	console.log('all result are here',result);
        // 	console.log('all result are here',result[0]);
        // 	console.log('all result are here',result[0].name);
        // });
        //connection.query('select * from usermaster where JoiningDate = 2021-01-12', function(err,result){
        	//if(err) throw err;
        	//console.log('all result are here',result);
        	//console.log('all result are here',result[0]);
        	//console.log('all result are here',result[0].name);
       // });
    }
});
  module.exports = connection;
