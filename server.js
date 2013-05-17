//setup Dependencies
var http = require('http'),
    express = require('express'),
    app = express(),
    path = require('path'),
    cons = require('consolidate'),
    dust = require('dustjs-linkedin'),
    io = require('socket.io'),
    check = require('validator').check;

var port = 8081;

var emailer = require('./emailer'),
    contactMe = require('./models/contact-me');

//var util = require('util');

//Setup Express

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.engine('dust', cons.dust);
    app.set('view engine', 'dust');
    app.set('template_engine', 'dust');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "j3rM"}));
    app.use(express.static(__dirname + '/static'));
    app.use(app.router);
    app.use(express.errorHandler());
 });

var server = http.createServer(app);
server.listen( port );


//Setup Socket.IO
var io = io.listen(server);
io.set('log level', 2);
io.sockets.on('connection', function(socket){
    console.log('Client Connected');
    socket.on('message', function(data){
        console.log("Client message: " + data)
        // socket.broadcast.emit('server_message',data);
        // socket.emit('server_message',data);
    });
    socket.on('disconnect', function(){
        console.log('Client Disconnected.');
    });
});

if(server.address().address == '0.0.0.0'){
    app.socketAddress = '127.0.0.1';
}
else{
    app.socketAddress = server.address().address;
}
console.log('Listening on ' + app.socketAddress +":"+ port );

exports.app = app;

// Setup Routes
var routes = require('./routes');
var NotFound = routes.NotFound;
