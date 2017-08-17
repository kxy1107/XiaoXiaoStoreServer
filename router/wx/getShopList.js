"user static"

var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");


router.get("/", function (req, res) {
    let UserNo = req.query.UserNo;
    let TypeID = req.query.TypeID;
    let PageSize = req.query.PageSize;
    let PageIndex = req.query.PageIndex;
    let BelongUser = "9A91BB01C585D794A24B498D4F591097";

    let proc = "CALL_PROC_WX_GET_COLLECT_LIST(?,?,?)";
    let params = [UserNo, TypeID, BelongUser,PageSize,PageIndex];
    sql.query(proc, params, function (rows, fileds) {
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = row[0][1]["Message"];

        let shopList = [];
        for (let key of rows[1]) {
            let list = {};
            list.ShopID = key["ShopID"];
            list.ShopTitle = key["ShopTitle"];
            list.ShopPrice = key["ShopPrice"];
            list.ShopViews = key["ShopViews"] == null ? 0 : key["ShopViews"];
            list.ImgUrl = key["ImgUrl"];
            shopList.push(list);
        }
        responseData.ShopList = shopList;
        res.json(responseData);
    });
});
module.exports = router;