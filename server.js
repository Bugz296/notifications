/**
 * Require Modules
 */
const express = require('express');
const session = require('express-session');
const app = express();
const server = app.listen(8000);
const io = require('socket.io')(server);


app.use(session({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));
app.use(express.static(__dirname));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');


/**
 * Routes
 */
app.get('/', function(req, res){
    let session_id = req.sessionID;
    res.render('index', {session_id});
});
/* Socket Event Listener */
io.on('connection', function(socket){
    socket.on('disconnect', function(res){
        socket.broadcast.emit('user_disconnected', {id: socket.id});
    });
    socket.on('notify', function(){
        io.emit('notify', {id: socket.id});
    });

    io.emit('display_id', {id: socket.id});
});