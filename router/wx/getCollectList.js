"user static"

var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");


router.get("/", function (req, res) {
    let UserNo = req.query.UserNo;

    let proc = "CALL PROC_WX_GET_COLLECT_LIST(?)";
    let params = [UserNo];
    sql.query(proc, params, function (rows, fileds) {
        console.log(rows);
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];

        let collectList = [];
        for (let key of rows[1]) {
            let list = {};
            list.collectionID = key["CollectionID"];
            list.shopID = key["ShopID"];
            list.shopTitle = key["ShopTitle"];
            list.shopPrice = key["ShopPrice"];
            list.shopSelectInfo = key["ShopSelectInfo"];
            list.shopCoverImg = key["ImgUrl"];
            collectList.push(list);
        }
        responseData.CollectList = collectList;
        res.json(responseData);
    });
});
module.exports = router;