'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {


        let UserNo = req.query.UserNo;

        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_TYPE_SUBTYPE(?)";//存储过程名称
        let params = [UserNo];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];

                let typeList = [];
                for (let key of rows[1]) {
                        let list = {};
                        let subTypeList = [];

                        list.value = key["ShopTypeID"];
                        list.lable = key["ShopTypeName"];
                        let arrSubTypeID = key["ShopSubTypeIDList"].split("&");
                        let arrSubTypeName = key["ShopSubTypeNameList"].split("&");
                        let subListLength = arrSubTypeID.length;

                        for (let i = 0; i < subListLength; i++) {
                                let subList = {};
                                subList.value =  arrSubTypeID[i];
                                subList.lable = arrSubTypeName[i];
                                subTypeList.push(subList)
                        }
                        
                        list.children = subTypeList;
                        typeList.push(list);

                        // let isExist = false;//已存在则不添加
                        // for (let item of typeList) {
                        //         if (item.typeID == list.typeID) {
                        //                 isExist = true;
                        //                 break;
                        //         }
                        // }
                        // if (!isExist) {
                        //         typeList.push(list);
                        // }


                }
                responseData.TypeSubTypeList = typeList;
                res.json(
                        responseData
                )
        });
});

module.exports = router;