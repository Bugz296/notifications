$(document).ready(function(){
    var socket = io();

    /* Socket IO listener */
    socket.on('display_id', function(res){
        if(res){
            let html = `<p>Socket ID: ${res.id} has joined! </p>`;
            $('#notification-cont').append(html);
        }
    });

    socket.on('user_disconnected', function(res){
        if(res){
            let html = `<p>Socket ID: ${res.id} left us! </p>`;
            $('#notification-cont').append(html);
        }
    });

    socket.on('notify', function(res){
        if(res){
            let html = `<p>Socket ID: ${res.id} just hit the button! </p>`;
            $('#notification-cont').append(html);
        }
    });

    $('#notify').click(function(){
        socket.emit('notify');
    });

    $('#logout').click(function(){
        window.close();
    });
});