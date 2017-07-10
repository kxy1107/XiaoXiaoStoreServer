var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.listen(8028);
console.log('Listening on port 8028...');


//小程序端
app.use('/wx/login',require('./router/login'));//微信登录
app.use('/wx/getUserInfo',require('./router/getUserInfo'));//同步获取用户信息
app.use('/wx/addMerchants',require('./router/addMerchants'));//注册成为商家
app.use('/wx/addShareInfo',require('./router/addShareInfo'));//添加分享内容
app.use('/wx/getHotShareInfo',require('./router/getHotShareInfo'));//获取热门分享内容列表
app.use('/wx/getMyShareInfo',require('./router/getMyShareInfo'));//获取我的分享内容列表
app.use('/wx/delMyShareInfo',require('./router/delMyShareInfo'));//获取我的分享内容列表
app.use('/wx/addLinkInfo',require('./router/addLinkInfo'));//添加分享链接
app.use('/wx/getShareDetail',require('./router/getShareDetail'));//获取分享详情内容
app.use('/wx/getLinkRecord',require('./router/getLinkRecord'));//获取好友帮抢记录

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





// var httpServer = http.createServer(app);
// httpServer.listen(8028,function(){
//  console.log("httpServer is OK");
// });
