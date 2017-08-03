'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
        let ShopID = req.query.ShopID;
        let ShopTitle = req.query.ShopTitle;
        let ShopPrice = req.query.ShopPrice;
        let ShopBrandID = req.query.ShopBrandID;
        let ShopDescribe = req.query.ShopDescribe;
        let ShopTypeID = req.query.ShopTypeID;
        let ShopSubTypeID = req.query.ShopSubTypeID;
        let IsIndexBanner = req.query.IsIndexBanner;
        let IsHot = req.query.IsHot;
        let IsNew = req.query.IsNew;
        let IndexImgUrl = req.query.IndexImgUrl;
        let ShopBannerImgUrl = req.query.ShopBannerImgUrl;
        let AttributeValue = req.query.AttributeValue;
        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_ADD_SHOPINFO(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";//存储过程名称
        let params = [UserNo,ShopID, ShopTitle,ShopPrice,ShopBrandID,ShopDescribe, ShopTypeID,ShopSubTypeID,
                IsIndexBanner,IsHot,IsNew,IndexImgUrl,ShopBannerImgUrl,AttributeValue];//存储过程参数
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