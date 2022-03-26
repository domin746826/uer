/*const raspi = require('raspi');
const gpio = require('raspi-gpio');

raspi.init(() => {
  const input = new gpio.DigitalInput('P1-3');
  const output = new gpio.DigitalOutput('P1-5');
  output.write(input.read());

});*/

//var raspividStream = require('raspivid-stream');
const express = require('express')
const app = express()
const httpServer = require("http").createServer(app);
const socketIO = require("socket.io")
const {SerialPort, ReadlineParser} = require('serialport')

let joystick;

let roverMotionData = 
{
	type: "motionData",

	left:
	{
		frontServo: 90,
		frontPower: 0,

		backServo: 90,
		backPower: 0,
	},
	right:
	{	
		frontServo: 90,
		frontPower: 0,

		backServo: 90,
		backPower: 0,
	}
};

const options = {};
io = socketIO(httpServer,options);
httpServer.listen(80);

app.use(express.static(__dirname));
app.get('/', (req, res) =>
{
	res.sendFile("./index.html");
})

io.on("connection", (socket) =>
{
	//uncomment if you use raspberry pi native camera and you need h264 stream	
	/*socket.on("startStream", (arg) => 
	{
		console.log("streamStarted");
		let stream = raspividStream();
		stream.on('data', (data) => {
	        	socket.emit("videoStream", data)
		});
	});*/

	socket.on("joystick", (arg) =>
	{
		joystick = arg;
	});
});

let roverLoop = window.setInterval(()=>
{	
	//TODO calculate wheels speed, direction and steer angle from object "joystick" and put it in "roverMotionData"

	let roverMotionDataJson = JSON.stringify(roverMotionData);
	port.write(roverMotionDataJson + "\n");	
}, 40);



const port = new SerialPort({
	path: '/dev/ttyUSB0',
	baudRate: 115200,
});

const parser = new ReadlineParser();
port.pipe(parser);
parser.on('data', console.log);

console.log("Server started");


