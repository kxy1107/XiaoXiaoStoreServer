'user static'
var express = require('express');
var router = express.Router();
var multer = require('multer');
var timeUtil = require('../../util/TimeUtil.js')



var storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'public/')
        },
        filename: function (req, file, cb) {
                if (file.mimetype.indexOf('image') > -1) {
                        cb(null, file.fieldname + '-' + timeUtil.getNowDate() + '.png')
                } else {
                        cb(null, file.fieldname + '-' + timeUtil.getNowDate())
                }

        }
})

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })


router.post('/', upload.single('file'), function (req, res) {
        //  { fieldname: 'file',
        //   originalname: 'ic_web_collection_p.png',
        //   encoding: '7bit',
        //   mimetype: 'image/png',
        //   destination: 'uploads/',
        //   filename: 'file-201707221521.png',
        //   path: 'uploads\\file-201707221521.png',
        //   size: 1729 }

        let responseData = {};
        responseData.Code = '1';
        responseData.Message = '成功';
        let url = 'public/' + req.file.filename;
        responseData.ImgUrl = url;
        res.json(
                responseData
        )
});

module.exports = router;