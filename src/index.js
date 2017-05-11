import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// var data = require('./test.json')
// var data2 = require('./students.json')

var socket = io()
socket.on('initialize data', function(msg){
	ReactDOM.render(
	<App students={msg} socket={socket} />,
	document.getElementById('root')
)	
})

// ReactDOM.render(
// 	<App students={data} />,
// 	document.getElementById('root')
// )	