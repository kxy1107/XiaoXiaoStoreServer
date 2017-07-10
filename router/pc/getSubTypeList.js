'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
        let SubTypeName = req.query.SubTypeName;
        let PageIndex = req.query.PageIndex;
        let PageSize = req.query.PageSize;

        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_SUBTYPELIST(?,?,?,?)";//存储过程名称
        let params = [UserNo, SubTypeName, PageIndex, PageSize];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                let subTypeList = [];
                for (let key of rows[1]) {
                        let list = {};
                        list.typeID = key["ShopTypeID"];
                        list.typeName = key["ShopTypeName"];
                        list.subTypeID = key["ShopSubTypeID"];
                        list.subTypeName = key["ShopSubTypeName"];
                        subTypeList.push(list);
                }
                responseData.SubTypeList = subTypeList;
                res.json(
                        responseData
                )
        });
});

module.exports = router;