'user static'
var express = require('express');
var router = express.Router();
var sql = require("../db/mysqlConnect");

router.get('/',function(req,res){
      
        let ShowContentID = req.query.ShowContentID;
        let ShareUserNo = req.query.ShareUserNo;
        let UserNo = req.query.UserNo;

       //链接数据库，执行存储过程
        let proc = "CALL PROC_GET_LINK_LIST(?,?,?)";//存储过程名称
        let params = [ShowContentID,UserNo,ShareUserNo];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                  responseData.TotalMoney = rows[1][0]["TotalMoney"] == null ? 0.00 : rows[1][0]["TotalMoney"];
                let linkList = [];
                 for (let key of rows[2]) {
                        let list = {};
                        list.UserImg = key["UserImg"];
                        list.UserName = key["UserName"];
                        list.Money = key["Money"];
                        linkList.push(list);
                }
                responseData.LinkList = linkList;
                res.json(
                responseData
                )
        });
});

module.exports = router;