"user static"
var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get("/",function(req,res){
    let UserNo = req.query.UserNo;
    let BelongUser = "";

    let proc = "CALL PROC_WX_GET_SHOP_OWNER(?,?)";
    let params = [UserNo,BelongUser];
    sql.query(proc,params,function(rows,fields){
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];
        responseData.Phone = rows[1][0]["ShopOwnerPhone"];
        responseData.QQ = rows[1][0]["ShopOwnerQQ"];
        responseData.Wechat = rows[1][0]["ShopOwnerWechat"];
        responseData.WechatImg = rows[1][0]["WechatImg"];
    });

});
module.exports = router;