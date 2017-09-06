'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/',function(req,res){
      
        let UserNo = req.query.UserNo;
      

       //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_MY_INFO(?)";//存储过程名称
        let params = [UserNo];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];

                responseData.MyInfo = {
                        Name: rows[1][0]["UserName"],
                        Phone: rows[1][0]["UserPhone"],
                        QQ: rows[1][0]["UserQQ"],
                        Wechat: rows[1][0]["UserWechat"],
                        QrCode: rows[1][0]["IconQrCode"],
                };

                res.json(
                responseData
                )
        });
});

module.exports = router;