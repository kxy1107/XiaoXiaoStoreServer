'user static'
var express = require('express');
var router = express.Router();
var sql = require("../db/mysqlConnect");

router.get('/', function (req, res) {

        let WxUserNo = req.query.UserNo;
        let BelongUser = "";

        //链接数据库，执行存储过程
        let proc = "CALL PROC_WX_GET_INDEX_INFO(?)";//存储过程名称
        let params = [UserNo, BelongUser];//存储过程参数

        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                let bannerList = [];
                for (let key of rows[1]) {
                        let list = {};
                        list.ShopID = key["ShopID"];
                        list.ShopTitle = key["ShopTitle"];
                        list.ImgUrl = key["ImgUrl"];
                        bannerList.push(list);
                }
                responseData.BannerList = bannerList;

                let hotList = [];
                for (let key of row[2]) {
                        let list = {};
                        list.ShopID = key["ShopID"];
                        list.ShopTitle = key["ShopTitle"];
                        list.ShopPrice = key["ShopPrice"];
                        list.ShopViews = key["ShopViews"];
                        list.ImgUrl = key["ImgUrl"];
                        hotList.push(list);
                }
                responseData.HotList = hotList;

                let newList = [];
                for (let key of row[2]) {
                        let list = {};
                        list.ShopID = key["ShopID"];
                        list.ShopTitle = key["ShopTitle"];
                        list.ShopPrice = key["ShopPrice"];
                        list.ShopViews = key["ShopViews"];
                        list.ImgUrl = key["ImgUrl"];
                        newList.push(list);
                }
                responseData.NewList = newList;


                res.json(
                        responseData
                )
        });
});

module.exports = router;