'user static'

const APP_ID = 'wx1785864730ce7edc';
const SECRET = 'ae3ca1f28a683651fd8bd070e2faea90';
var https = require("https");
var iconv = require("iconv-lite");
var crypto = require('crypto');
var qs=require('querystring');


function getSessionKey(Code, successRes) {
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
            return typeof successRes == "function" && successRes(sessionKey);
        });
    }).on("error", function (err) {
        Logger.error(err.stack)
        callback.apply(null);
    });
}

//获取AccessToken
function getAccessToken(successRes) {
    //先读取本地是否有access——tocken 并且未超过7200ms
    if (typeof global.access_token != "undefined" && global.access_token != ""
        && typeof global.access_token_time != "undefined" && global.access_token_time != ""
        && global.access_token_time - Date.parse(new Date()) < 7200) {
        return typeof access_token == "function" && successRes(global.access_token);
    } else {
        let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APP_ID + '&secret=' + SECRET;
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
                let access_token = JSON.parse(result).access_token;
                global.access_token = access_token;
                global.access_token_time = Date.parse(new Date());
                return typeof successRes == "function" && successRes(access_token);
            });
        }).on("error", function (err) {
            Logger.error(err.stack)
            callback.apply(null);
        });
    }


}
/**
 * 发送模板
 * postData = {
  "touser": "OPENID",  
  "template_id": "TEMPLATE_ID", 
  "page": "index",          
  "form_id": "FORMID",         
  "data": {
      "keyword1": {
          "value": "339208499", 
          "color": "#173177"
      }, 
      "keyword2": {
          "value": "2015年01月05日 12:30", 
          "color": "#173177"
      }, 
      "keyword3": {
          "value": "粤海喜来登酒店", 
          "color": "#173177"
      } , 
      "keyword4": {
          "value": "广州市天河区天河路208号", 
          "color": "#173177"
      } 
  },
  "emphasis_keyword": "keyword1.DATA" 
}
 */
function sentTemplate(postData, successRes) {
    getAccessToken(function(accessToken){
        var regUrl = "/cgi-bin/message/wxopen/template/send?access_token=" + accessToken;
        
        
            var content=qs.stringify(postData);
            var options = {
                host: 'api.weixin.qq.com',
                port: 443,
                path: regUrl,
                method: 'POST',
                headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':content.length
                }
              };
            var post_req = https.request(options, function (res) {
                console.log(res);
        
                res.on('data', function (buffer) {
                    console.log(buffer.toString());
                });
                post_req.write(content);
                post_req.end();
            })
        
    })
   


}


function decryptData(encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}

module.exports = {
    getSessionKey,
    decryptData,
    getAccessToken,
    sentTemplate,
}