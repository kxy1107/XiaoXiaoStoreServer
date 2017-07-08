'user static'
var express = require('express');
var https = require("https");  
var iconv = require("iconv-lite");  
var router = express.Router();
const APP_ID = 'wx1785864730ce7edc';
const SECRET = 'ae3ca1f28a683651fd8bd070e2faea90';

router.get('/',function(req,resLogin){
        let Code = req.query.Code;
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APP_ID + '&secret=' + SECRET + '&js_code=' + Code + '&grant_type=authorization_code';
        https.get(url,function(res){
        var datas = [];  
                var size = 0;  
                res.on('data', function (data) {  
                    datas.push(data);  
                    size += data.length;  
                //process.stdout.write(data);  
                });  
                res.on("end", function () {  
                    var buff = Buffer.concat(datas, size);  
                    var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring  
                    let resData = {
                        Code:1,
                        Message:'success',
                    };

                   global.sessionKey = JSON.parse(result).session_key;
                    resLogin.json(resData);
                    console.log(result);  
                });  
            }).on("error", function (err) {  
                Logger.error(err.stack)  
                callback.apply(null);  
        });



});

module.exports = router;