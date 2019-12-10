var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var task = [{
        id: 1,
        status : "clean room",
        task: "Done" 
}]

app.use(express.static('public/js'));
app.use(express.static('views'));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));



io.on('connection',function(socket){
    socket.emit('tasks',task);

    socket.on('new-task',function(data){
        task.push(data);
        io.sockets.emit('tasks',task);

    });
});

server.listen(8080, function() {
	console.log('Server on http://localhost:8080');
});