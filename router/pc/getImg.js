'user static'
var express = require('express');
var router = express.Router();
var url = require('url');
var fs = require('fs');
var path = require('path');



router.get('/', function (req, response) {
         console.log(111111111)

        //mime类型
        var mime = {
                "css": "text/css",
                "gif": "image/gif",
                "html": "text/html",
                "ico": "image/x-icon",
                "jpeg": "image/jpeg",
                "jpg": "image/jpeg",
                "js": "text/javascript",
                "json": "application/json",
                "pdf": "application/pdf",
                "png": "image/png",
                "svg": "image/svg+xml",
                "swf": "application/x-shockwave-flash",
                "tiff": "image/tiff",
                "txt": "text/plain",
                "wav": "audio/x-wav",
                "wma": "audio/x-ms-wma",
                "wmv": "video/x-ms-wmv",
                "xml": "text/xml"
        };

        var pathName = req.baseUrl;
        var rootPath = path.join(__dirname, '../../');
        var filePath = path.resolve(rootPath + pathName);
        var ext = path.extname(pathName);
        ext = ext ? ext.slice(1) : 'unknown';
        var contentType = mime[ext] || "text/plain";

       response.setHeader("Content-Type", contentType);
        //格式必须为 binary 否则会出错
        var content =  fs.readFileSync(filePath,"binary");   
        response.writeHead(200, "Ok");
        response.write(content,"binary"); //格式必须为 binary，否则会出错
        response.end();
});

module.exports = router;