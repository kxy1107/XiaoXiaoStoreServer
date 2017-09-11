'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
        let ShopID = req.query.ShopID;
        let BelongUser = req.query.BelongUser;


        //链接数据库，执行存储过程
        let proc = "CALL PROC_WX_GET_SHOPINFO_DETAIL(?,?,?)";//存储过程名称
        let params = [UserNo, ShopID,BelongUser];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];

                let shopInfoList = {};
                shopInfoList.shopID = rows[1][0]["ShopID"];
                shopInfoList.shopTitle = rows[1][0]["ShopTitle"];
                shopInfoList.shopPrice = rows[1][0]["ShopPrice"];
                shopInfoList.shopViews = rows[1][0]["ShopViews"];
                shopInfoList.shopDescribe = rows[1][0]["ShopDescribe"];
                shopInfoList.isHot = rows[1][0]["IsHot"];
                shopInfoList.isNew = rows[1][0]["IsNew"];
                shopInfoList.brandID = rows[1][0]["BrandID"];
                shopInfoList.brandName = rows[1][0]["BrandName"];
                shopInfoList.shopTypeID = rows[1][0]["ShopTypeID"];
                shopInfoList.shopSubTypeID = rows[1][0]["ShopSubTypeID"];
                shopInfoList.shopSubTypeName = rows[1][0]["ShopSubTypeName"];
                shopInfoList.bannerList = [];
                shopInfoList.attributeList = [];

                shopInfoList.shopCoverImgUrl = rows[2][0]["ImgUrl"];

                //商品轮播图
                 for (let key of rows[3]) {
                        let list = {};
                        list.imgID = key["ImgID"];
                        list.imgUrl = key["ImgUrl"];
                        shopInfoList.bannerList.push(list);
                }

              //商品属性值列表
                for (let key of rows[4]) {
                        let list = {};
                        let attributeValueList = [];

                        list.attributeID = key["AttributeID"];
                        list.attributeName = key["AttributeName"];
                        let arrValueID = key["AttributeValueIDList"].split("&");
                        let arrValue = key["AttributeValueList"].split("&");
                        let subListLength = arrValueID.length;

                        for (let i = 0; i < subListLength; i++) {
                                let subList = {};
                                subList.attributeValueID =  arrValueID[i];
                                subList.attributeValue = arrValue[i];
                                attributeValueList.push(subList)
                        }
                        
                        list.attributeValueList = attributeValueList;
                        shopInfoList.attributeList.push(list);

                      
                }


                responseData.ShopInfoList = shopInfoList;
                res.json(
                        responseData
                )
        });
});

module.exports = router;