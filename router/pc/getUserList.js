'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/',function(req,res){
      
        let UserNo = req.query.UserNo;
        let UserName = req.query.UserName;
        let PageIndex = req.query.PageIndex;
        let PageSize = req.query.PageSize;

       //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_USER_LIST(?,?,?,?)";//存储过程名称
        let params = [UserNo,UserName,PageIndex,PageSize];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];

                responseData.TotalCount = rows[1][0]["TotalCount"];
                
                let userList = [];
                 for (let key of rows[2]) {
                        let list = {};
                        list.UserName = key["UserName"];
                        list.UserImg = key["UserImg"];
                        list.UserCity = key["UserCity"];
                        list.UserGender = key["UserGender"];
                        list.RegisterTime = key["RegisterTime"];
                        list.LastLoginTime = key["LastLoginTime"];
                        userList.push(list);
                }
                responseData.UserList = userList;
                res.json(
                responseData
                )
        });
});

module.exports = router;