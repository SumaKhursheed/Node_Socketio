var express=require("express");
var app=express();
var http=require("http").Server(app);
var io=require("socket.io")(http);
var didEmit = false
app.get('/',function(req,res){
  res.json({"messgae":"connected"});
});

app.get('/emit/true',function(req,res){
	didEmit = true
  res.json({"messgae":"connected","didEmit":didEmit});
});

app.get('/emit/false',function(req,res){
	didEmit = false
  res.json({"messgae":"connected","didEmit":didEmit});
});

io.on('connection',function(socket){

// socket.on('tester', function (data) {
    
//     // if(didEmit == true){
//     	socket.broadcast.emit('tester', {
//       "name":"Suma",
//       "age":"27"
//     });
// 	console.log("user connected, didEmit"+ didEmit );
// 	 	didEmit == false
//     // }
    
//   });

	socket.on('trigger', function(data)
	{
		console.log("data: " + data);
		socket.emit("location_resp", "Location Response 12345");
	});



	// if(didEmit == true){
	// 	socket.emit('tester', {"name":"Suma"}, 1000);
	// 	console.log("user connected, didEmit"+ didEmit );
	// 	didEmit == false
	// }
  
  socket.on('disconnect',function(){
    console.log("user disconnected");
  })
});

module.exports = app;
