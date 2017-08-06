'user static'

var WXBizDataCrypt = require('../../util/WXBizDataCrypt');
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
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APP_ID + '&secret=' + SECRET + '&js_code=' + Code + '&grant_type=authorization_code';
    https.get(url, function (res) {
        let datas = [];
        let size = 0;
        res.on('data', function (data) {
            datas.push(data);
            size += data.length;
            //process.stdout.write(data);  
        });
        res.on("end", function () {
            let buff = Buffer.concat(datas, size);
            let result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring  
            let sessionKey = JSON.parse(result).session_key;

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
    }).on("error", function (err) {
        Logger.error(err.stack)
        callback.apply(null);
    });



});

module.exports = router;