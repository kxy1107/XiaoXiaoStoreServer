'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserPhone = req.query.Phone;
        let UserPassword = req.query.Password;

        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_LOGIN(?,?)";//存储过程名称
        let params = [UserPhone, UserPassword];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                
                let userInfo = {};
                if(rows[1] != null && typeof rows[1] != "undefined"){
                        userInfo.UserNo = rows[1][0]['UserNo'];
                        userInfo.UserName = rows[1][0]['UserName'];
                        userInfo.UserPhone = rows[1][0]['UserPhone'];
                        userInfo.UserQQ = rows[1][0]['UserQQ'];
                        userInfo.UserWechat = rows[1][0]['UserWechat'];
                       
                }
                responseData.UserInfo = userInfo;
                res.json(
                        responseData
                )
        });
});

module.exports = router;