'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
        let ShopTitle = req.query.ShopTitle;
        let IsHot = req.query.IsHot;
        let IsNew = req.query.IsNew;
        let IsIndexBanner = req.query.IsIndexBanner;
        let PageIndex = req.query.PageIndex;
        let PageSize = req.query.PageSize;

        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_GET_SHOPINFO_LIST(?,?,?,?,?,?,?)";//存储过程名称
        let params = [UserNo, ShopTitle, IsHot, IsNew, IsIndexBanner, PageIndex, PageSize];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];

                responseData.TotalCount = rows[1][0]["TotalCount"];

                let shopInfoList = [];
                for (let key of rows[2]) {
                        let list = {};
                        list.shopID = key["ShopID"];
                        list.shopTitle = key["ShopTitle"];
                        list.shopPrice = key["ShopPrice"];
                        list.shopViews = key["ShopViews"];
                        list.isHot = key["IsHot"];
                        list.isNew = key["IsNew"];
                        list.brandID = key["BrandID"];
                        list.brandName = key["BrandName"];
                        list.shopTypeID = key["ShopTypeID"];
                        list.shopSubTypeID = key["ShopSubTypeID"];
                        list.shopSubTypeName = key["ShopSubTypeName"];

                        shopInfoList.push(list);
                }
                responseData.ShopInfoList = shopInfoList;
                res.json(
                        responseData
                )
        });
});

module.exports = router;