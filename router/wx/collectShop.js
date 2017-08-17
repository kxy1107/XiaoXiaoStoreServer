"user static"
var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get("/",function(req,res){
    let UserNo = req.query.UserNo;
    let ShopID = req.query.ShopID;
    let SelectAttr = req.query.SelectAttr;

    let proc = "CALL_PROC_WX_COLLECT_SHOP(?,?,?)";
    let params = [UserNo,ShopID,SelectAttr];

    sql.query(proc,params,function(rows,fields){
        console.log(rows);
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = row[0][1]["Message"];
        res.json(responseData);
    });
});
module.exports = router;