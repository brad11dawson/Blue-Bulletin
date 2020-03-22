var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
const PORT = process.env.PORT || 5000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});
app.get('/bulletin', function(req, res){
  res.sendFile(__dirname + '/bulletin.html')
})

io.on('connection', function(socket){
  //console.log('a user connected')
  socket.on('disconnect', function(){
    //console.log('user disconnected');
  })
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('message', function(id, message){
    //console.log(id)
    //console.log(message)
    io.to(id).emit('message', message)
  })
});

http.listen(PORT, () => console.log(`Listening on ${ PORT }`))