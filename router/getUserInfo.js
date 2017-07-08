'user static'
var express = require('express');
var router = express.Router();
var WXBizDataCrypt = require('../util/WXBizDataCrypt');
const APP_ID = 'wx1785864730ce7edc';
const SECRET = 'ae3ca1f28a683651fd8bd070e2faea90';
var sql = require("../db/mysqlConnect");

router.get('/',function(req,res){
        //解密用户信息
        let sessionKey = global.sessionKey;
        let encryptedData = req.query.encryptedData;
        let iv = req.query.iv;
        var pc = new WXBizDataCrypt(APP_ID, sessionKey);

        var data = pc.decryptData(encryptedData , iv);

        //获取解密后的信息，更新到数据库
        let OpenID = data.openId;
        let NickName = data.nickName;
        let Gender = data.gender;
        let City = data.city;
        let Province = data.province;
        let AvatarUrl = data.avatarUrl;
        console.log('Gender:' + Gender);
      


       //链接数据库，执行存储过程
        let proc = "CALL PROC_GET_USERINFO(?,?,?,?,?,?)";//存储过程名称
        let params = [OpenID, NickName, Gender,City,Province,AvatarUrl];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                responseData.UserNo = rows[1][0]["UserNo"];
                responseData.UserName = rows[1][0]["UserName"];
                responseData.UserImg = rows[1][0]["UserImg"];
                responseData.ISMerchants = rows[1][0]["MerchantsID"] == null ? false : true;
                res.json(
                responseData
                )
        });
});

module.exports = router;