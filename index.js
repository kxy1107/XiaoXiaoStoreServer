var express = require('express');
var app = express();
var http = require('http');

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
app.use('/pc/login',require('./router/pc/login'));//微信登录

var httpServer = http.createServer(app);
httpServer.listen(8028,function(){
 console.log("httpServer is OK");
});
