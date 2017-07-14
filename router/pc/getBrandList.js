'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/',function(req,res){
      
        let UserNo = req.query.UserNo;
        let BrandName = req.query.BrandName;
        let PageIndex = req.query.PageIndex;
        let PageSize = req.query.PageSize;

       //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_BRAND_LIST(?,?,?,?)";//存储过程名称
        let params = [UserNo,BrandName,PageIndex,PageSize];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                let brandList = [];
                 for (let key of rows[1]) {
                        let list = {};
                        list.brandID = key["BrandID"];
                        list.brandName = key["BrandName"];
                        brandList.push(list);
                }
                responseData.BrandList = brandList;
                res.json(
                responseData
                )
        });
});

module.exports = router;