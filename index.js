var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 发送给客户端纯文本
//app.get('/', function (req, res) {
//    res.send('<h1>Hello world</h1>');
//});
// 发送给客户端html文件
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// 监听连接
io.on('connection', function(socket){
    //console.log('a user connected');
    // 监听断线
    socket.on('disconnect', function(from){
        io.emit('disconnect', from + ' disconnected');
    });
    // 监听聊天事件'chat message'
    socket.on('chat message', function(from, msg){
        io.emit('chat message', from, msg);
    });
    // 监听私聊事件
    //socket.on('private message', function (from, msg) {
    //    console.log('I received a private message by ', from, ' saying ', msg);
    //});
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});