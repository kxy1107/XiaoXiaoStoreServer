'user static'
var express = require('express');
var router = express.Router();
var url = require('url');
var fs = require('fs');
var path = require('path');



router.get('/', function (req, response) {
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

        response.writeHead(200, { "content-type": contentType });
        //建立流对象，读文件
        var stream = fs.createReadStream(filePath);
        //错误处理
        stream.on('error', function () {
                response.writeHead(500, { "content-type": contentType });
                response.end("<h1>500 Server Error</h1>");
        });
        //读取文件
        stream.pipe(response);
});

module.exports = router;