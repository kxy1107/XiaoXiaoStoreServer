"user static"
var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get("/",function(req,res){
    let UserNo = req.query.UserNo;
    let CollectionID = req.query.CollectionID;
   
    let proc = "CALL PROC_WX_DEL_COLLECT_SHOP(?,?,?)";
    let params = [UserNo,CollectionID];

    sql.query(proc,params,function(rows,fields){
        console.log(rows);
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];
        res.json(responseData);
    });
});
module.exports = router;