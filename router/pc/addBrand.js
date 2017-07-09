'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

     
        let BrandID = req.query.BrandID;
        let BrandName = req.query.BrandName;
        let UserNo = req.query.UserNo;
        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_ADD_BRAND(?,?,?)";//存储过程名称
        let params = [BrandID, BrandName,UserNo];//存储过程参数
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