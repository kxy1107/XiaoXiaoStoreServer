"user static"

var express = require("express");
var router = express.Router();
var sql = require("../../db/mysqlConnect");


router.get("/", function (req, res) {
   
    let UserNo = req.query.UserNo;

    let proc = "CALL PROC_WX_GET_MY_INFO(?)";
    let params = [UserNo];
    sql.query(proc, params, function (rows, fileds) {
        console.log(rows);
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];
        let myInfo = null;
        if(rows[1].length > 0){
            myInfo = {
                Name: rows[1][0]["UserName"],
                QrCode: rows[1][0]["IconQrCode"],
                ContactList: [
                    {
                        ContactType: "Phone",
                        ContactIcon: rows[1][0]["IconPhone"],
                        ContactIconName: rows[1][0]["UserPhone"],
                    },
                    {
                        ContactType: "QQ",
                        ContactIcon: rows[1][0]["IconQQ"],
                        ContactIconName: rows[1][0]["UserQQ"],
                    },
                    {
                        ContactType: "Wechat",
                        ContactIcon: rows[1][0]["IconWechat"],
                        ContactIconName: rows[1][0]["UserWechat"],
                    }
                ]
            };
        }



        responseData.MyInfo = myInfo;
        res.json(responseData);
    });
});
module.exports = router;