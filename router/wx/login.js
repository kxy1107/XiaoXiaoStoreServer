'user static'

var WXBizDataCrypt = require('../../util/WXBizDataCrypt');
var WXUtil = require('../../util/WXUtil');
const APP_ID = 'wx1785864730ce7edc';
const SECRET = 'ae3ca1f28a683651fd8bd070e2faea90';
var sql = require("../../db/mysqlConnect");
var express = require('express');
var https = require("https");
var iconv = require("iconv-lite");
var router = express.Router();

router.get('/', function (req, resLogin) {
    //登录获取session_key
    let Code = req.query.Code;
    let encryptedData = req.query.EncryptedData;
    let iv = req.query.Iv;
    WXUtil.getSessionKey(Code, function (sessionKey) {

        //解密用户信息并存入数据库
        let pc = new WXBizDataCrypt(APP_ID, sessionKey);
        let data = pc.decryptData(encryptedData, iv);
        let OpenID = data.openId;
        let NickName = data.nickName;
        let Gender = data.gender;
        let City = data.city;
        let Province = data.province;
        let AvatarUrl = data.avatarUrl;

        //链接数据库，执行存储过程
        let proc = "CALL PROC_WX_LOGIN(?,?,?,?,?,?)";//存储过程名称
        let params = [OpenID, NickName, Gender, City, Province, AvatarUrl];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
            console.log(rows);
            let responseData = {};
            responseData.Code = rows[0][0]["Code"];
            responseData.Message = rows[0][0]["Message"];
            responseData.UserNo = rows[1][0]["UserNo"];
            responseData.UserName = rows[1][0]["UserName"];
            responseData.UserImg = rows[1][0]["UserImg"];
            resLogin.json(
                responseData
            )
        });

    });




});

module.exports = router;