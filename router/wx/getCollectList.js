"user static"

var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");


router.get("/", function (req, res) {
    let UserNo = req.query.UserNo;

    let proc = "CALL_PROC_WX_GET_COLLECT_LIST(?)";
    let params = [UserNo];
    sql.query(proc, params, function (rows, fileds) {
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = row[0][1]["Message"];

        let collectList = [];
        for (let key of row[1]) {
            let list = {};
            list.collectionID = key["CollectionID"];
            list.shopID = key["ShopID"];
            list.shopTitle = key["ShopTitle"];
            list.shopPrice = key["ShopPrice"];
            list.shopSelectInfo = key["ShopSelectInfo"];
            collectList.push(list);
        }
        responseData.CollectList = collectList;
        res.json(responseData);
    });
});
module.exports = router;