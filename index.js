var express = require('express');
var app = express();
var url = require("url");
var path = require("path");
var fs = require("fs");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
     res.header("Access-Control-Allow-Credentials","true");
   
    next();
});


app.listen(8028);
console.log('Listening on port 8028...');

//小程序端
app.use('/wx/login',require('./router/wx/login'));//微信登录
app.use('/wx/getIndexInfo',require('./router/wx/getIndexInfo'));//微信获取首页信息
app.use('/wx/getTypeList',require('./router/wx/getTypeList'));//微信获取类型列表
app.use('/wx/getSubTypeList',require('./router/wx/getSubTypeList'));//微信获取子类型列表


//PC后台管理端
app.use('/pc/login',require('./router/pc/login'));//登录
app.use('/pc/getBrandList',require('./router/pc/getBrandList'));//获取商品品牌列表
app.use('/pc/addBrand',require('./router/pc/addBrand'));//添加商品品牌
app.use('/pc/delBrand',require('./router/pc/delBrand'));//删除商品品牌列表
app.use('/pc/getTypeList',require('./router/pc/getTypeList'));//获取商品类型列表
app.use('/pc/addType',require('./router/pc/addType'));//添加商品类型
app.use('/pc/delType',require('./router/pc/delType'));//删除商品类型
app.use('/pc/getSubTypeList',require('./router/pc/getSubTypeList'));//获取商品子类型列表
app.use('/pc/addSubType',require('./router/pc/addSubType'));//添加商品子类型
app.use('/pc/delSubType',require('./router/pc/delSubType'));//删除商品子类型
app.use('/pc/getAttributeList',require('./router/pc/getAttributeList'));//获取商品属性列表
app.use('/pc/addAttribute',require('./router/pc/addAttribute'));//添加商品属性
app.use('/pc/delAttribute',require('./router/pc/delAttribute'));//删除商品属性
app.use('/pc/getAttributeValueList',require('./router/pc/getAttributeValueList'));//获取商品属性值列表
app.use('/pc/addAttributeValue',require('./router/pc/addAttributeValue'));//添加商品属性值
app.use('/pc/delAttributeValue',require('./router/pc/delAttributeValue'));//删除商品属性值
app.use('/pc/getShopInfoList',require('./router/pc/getShopInfoList'));//获取商品信息列表
app.use('/pc/addShopInfo',require('./router/pc/addShopInfo'));//添加商品信息
app.use('/pc/delShopInfo',require('./router/pc/delShopInfo'));//删除商品信息
app.use('/pc/getShopInfoDetail',require('./router/pc/getShopInfoDetail'));//获取商品详情信息

app.use('/pc/getTypeSubType',require('./router/pc/getTypeSubType'));//获取商品详情信息-获取类型和子类型关联数据

app.use('/pc/uploadBanner',require('./router/pc/uploadBanner'));//上传图片
// app.use(express.static('public'));
 app.use('*.png',require('./router/pc/getImg'));//上传图片




// var httpServer = http.createServer(app);
// httpServer.listen(8028,function(){
//  console.log("httpServer is OK");
// });
