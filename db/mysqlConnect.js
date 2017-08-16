'use strict'
var mysql = require('mysql'); //导入mysql Module  
  
var pool = mysql.createPool({  
    host: '123.56.24.108',  
    user: 'root',  
   // password: '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',  
    password: '111111',  
    database: 'xiaoxiaostore' ,
    port:3306 
});  
  
//查询sql语句  
function query(strSQL, param, callback) {  
    pool.getConnection(function(err, connection) {  
        connection.query(strSQL, param, function(err, rows, fields) {  
            if (err) throw err;  
            callback(rows, fields);  
            connection.release();
            // connection.destroy();  
        });  
    });  
}  
  
exports.query = query;  