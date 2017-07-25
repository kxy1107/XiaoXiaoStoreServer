'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");
var fs = require("fs");


router.post('/', function (req, res) {

        let ImgPath = req.query.ImgUrl;
        let UserNo = req.query.UserNo;

        fs.unlink(ImgPath, function () {
                let proc = "CALL PROC_PC_DEL_INDEX_BANNER_IMG(?,?)";//存储过程名称
                let params = [UserNo, ImgPath];//存储过程参数
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


});

module.exports = router;