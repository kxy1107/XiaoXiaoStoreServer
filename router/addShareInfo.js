'user static'
var express = require('express');
var router = express.Router();
var sql = require("../db/mysqlConnect");

router.get('/',function(req,res){
        let ContentID = req.query.ContentID;
        let UserNo = req.query.UserNo;
        let ContentHead = req.query.ContentHead;
        let ContentEnd = req.query.ContentEnd;
        let ImprotantContent = req.query.ImprotantContent;

       //链接数据库，执行存储过程
        let proc = "CALL PROC_ADD_UPDATE_SHOW_CONTENT(?,?,?,?,?)";//存储过程名称
        let params = [ContentID, UserNo,ContentHead,ContentEnd,ImprotantContent];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                res.json(
                responseData
                )
        });
});

module.exports = router;