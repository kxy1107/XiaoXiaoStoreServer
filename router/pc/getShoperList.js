'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/',function(req,res){
      
        let UserNo = req.query.UserNo;
        let UserPhone = req.query.UserPhone;
        let PageIndex = req.query.PageIndex;
        let PageSize = req.query.PageSize;

       //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_SHOPER_LIST(?,?,?,?)";//存储过程名称
        let params = [UserNo,PageIndex,PageSize,UserPhone];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];

                responseData.TotalCount = rows[1][0]["TotalCount"];
                
                let shoperList = [];
                 for (let key of rows[2]) {
                        let list = {};
                        list.AdminID = key["AdminID"];
                        list.UserNo = key["UserNo"];
                        list.UserName = key["UserName"];
                        list.UserPhone = key["UserPhone"];
                        list.RegisterTime = key["RegisterTime"];
                        list.LastLoginTime = key["LastLoginTime"];
                        list.CheckState = key["CheckState"];
                        shoperList.push(list);
                }
                responseData.ShoperList = shoperList;
                res.json(
                responseData
                )
        });
});

module.exports = router;