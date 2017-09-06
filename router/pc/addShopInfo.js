'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
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
        let ShopCoverImgUrl = req.query.ShopCoverImgUrl;
        let ShopBannerImgUrl = req.query.ShopBannerImgUrl;
        let Attribute = req.query.Attribute;
        let AttributeValue = req.query.AttributeValue;
        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_ADD_SHOP_INFO(?,?,?,?,?,?,?,?,?,?,?,?)";//插入商品信息存储过程
        let params = [UserNo, ShopTitle, ShopPrice, ShopBrandID, ShopDescribe, ShopTypeID, ShopSubTypeID,
                IsIndexBanner, IsHot, IsNew, IndexImgUrl,ShopCoverImgUrl];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                let ShopID = rows[1][0]["ShopID"];
                let procShopImg = "CALL PROC_PC_ADD_SHOP_BANNER_IMG(?,?,?)";//插入商品轮播图存储过程
                for (let key of ShopBannerImgUrl) {
                        let ImgUrl = key;
                        let paramsShopImg = [UserNo, ShopID, ImgUrl];//存储过程参数
                        sql.query(procShopImg, paramsShopImg, function (res, fields) {

                        })
                }

                let procAttribut = "CALL PROC_PC_ADD_ATTRIBUTE(?,?,?,?)";//插入商品属性存储过程
                for (let attributKey of Attribute) {
                        let AttributeID = attributKey.attributeID;
                        let AttributeName = attributKey.attributeName;
                        let paramsAttribut = [ShopID,UserNo, AttributeID, AttributeName];//存储过程参数
                        sql.query(procAttribut, paramsAttribut, function (rows, fields) {

                        })
                }

                let procAttributValue = "CALL PROC_PC_ADD_ATTRIBUTE_VALUE(?,?,?,?,?)";//插入商品属性值存储过程
                for (let key of AttributeValue) {
                        let AttributeValueID = key.attributeValueID;
                        let AttributeID = key.attributeID;
                        let AttributeValue = key.attributeValue;
                        let paramsAttribut = [ShopID, AttributeValueID, UserNo, AttributeID, AttributeValue];//存储过程参数
                        sql.query(procAttributValue, paramsAttribut, function (rows, fields) {

                        })
                }
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                res.json(
                        responseData
                )
        });
});

module.exports = router;