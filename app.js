var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var data = require('./src/G.json')
const students = data.map((student) =>
		({"s_id":student.s_id,
			"name":student.name,
			"attendance":false
		}))

app.use('/', express.static('public'));
// app.use(express.static('public'));

// app.get('/', function(req,res) {
// 	res.sendFile(__dirname+'/public/index.html')
// })

// app.get('/dist/bundle.js', function(req,res) {
// 	res.sendFile(__dirname+'/public/dist/bundle.js')
// })


http.listen(8000,function() {
	console.log('listening on *:8000');
});

io.on('connection', function(socket) {
	console.log('a user connected.')
	io.emit('initialize data', students)
	// socket.broadcast.emit('init',data)

	socket.on('client msg', function(student){
		foundIdx = students.findIndex(x=>x.s_id == student.s_id)
		students[foundIdx].attendance = !student.attendance
		io.emit('server msg',student)
	})
})
