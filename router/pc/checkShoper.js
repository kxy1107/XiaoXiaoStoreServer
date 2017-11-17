'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");
var WXUtil = require('../../util/WXUtil');

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
        let AdminID = req.query.AdminID;
        let HasAccess = "";
        let checkResult = req.query.CheckResult;
        if (checkResult == "ACCESS") {
                HasAccess = "C0A"
        } else {
                HasAccess = "C0J"
        }

        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_CHECK_SHOPER(?,?,?)";//存储过程名称
        let params = [UserNo, AdminID, HasAccess];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                var formID = rows[1][0]["FormID"];
                var userNo = rows[1][0]["UserNo"];
                var openID = rows[1][0]["OpenID"];
                var result = checkResult == "ACCESS" ? "审核通过" : "审核失败";
                var remarks = checkResult == "ACCESS" ? "注册成功，可登录http://jianyuejizhang.cn/ 上传自己的产品" : "审核失败，请联系管理员qq573240722";


                res.json(
                        responseData
                );
                 //微信模板消息
                 var postData = {
                        "touser": openID,
                        "template_id": "yFnHuEcAV9yfk1NX9MBStn56sHcEPXJcp1wT24H0dfM",
                        "page": "index?belongUser=" + userNo,
                        "form_id": formID,
                        "data": {
                                "keyword1": {
                                        "value": result,
                                },
                                "keyword2": {
                                        "value": remarks,
                                },
                        },
                        "emphasis_keyword": "keyword1.value"
                }
                WXUtil.sentTemplate(postData, function (sentResult) {
                      console.log(sentResult);
                });

        });
});

module.exports = router;