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
//const {SerialPort, ReadlineParser} = require('serialport')

let joystick = 
{
	left:
	{
		x: 0,
		y: 0
	},
	right:
	{
		x: 0,
		y: 0
	}
};

let roverSteeringCalculated = 
{
	left:
	{
		front: 0,
		back: 0
	},
	right:
	{
		front: 0,
		back: 0
	}
};

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
	},
	debug:
	{
		steeringRadius: 0,
		steeringY: 0
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


	let roverLoop = setInterval(()=>
	{	
		//TODO calculate wheels speed and direction from object "joystick" and put it in "roverMotionData"
		//roverX is distance from center to outer wheels in X axis
		//roverY is distance from center to outer wheels in Y axis
		//(we assume here that the Y and Z axes are swapped)
		let roverX = 214;
		let roverY = 384;
	
		if(!inRange(joystick.right.x, -1, 1))
		{
			let steeringRadius = 21400 / joystick.right.x;
			let steeringY = joystick.right.y * 4;
			console.log(steeringY);
			roverSteeringCalculated.left.front = (Math.atan((steeringY+roverY) / (steeringRadius + roverX)) * 180) / Math.PI;
			roverSteeringCalculated.left.back = (Math.atan((steeringY-roverY) / (steeringRadius + roverX)) * 180) / Math.PI;
			roverSteeringCalculated.right.front = (Math.atan((steeringY+roverY) / (steeringRadius - roverX)) * 180) / Math.PI;
			roverSteeringCalculated.right.back = (Math.atan((steeringY-roverY) / (steeringRadius - roverX)) * 180) / Math.PI;
			/*let angleLeft = (Math.atan(roverY / (steeringRadius + roverX)) * 180) / Math.PI;
			let angleRight = (Math.atan(roverY / (steeringRadius - roverX)) * 180) / Math.PI;

			roverMotionData.left.frontServo = angleLeft + 90;
			roverMotionData.left.backServo = -angleLeft + 90;
			roverMotionData.right.frontServo = angleRight + 90;
			roverMotionData.right.backServo = -angleRight + 90;*/

			roverMotionData.left.frontServo = roverSteeringCalculated.left.front + 90;
			roverMotionData.left.backServo = roverSteeringCalculated.left.back + 90;
			roverMotionData.right.frontServo = roverSteeringCalculated.right.front + 90;
			roverMotionData.right.backServo = roverSteeringCalculated.right.back + 90;

			roverMotionData.debug.steeringRadius = steeringRadius;
			roverMotionData.debug.steeringY = steeringY;
		}
		else
		{
			
			roverMotionData.left.frontServo = joystick.right.x + 90;
			roverMotionData.left.backServo = -joystick.right.x + 90;
			roverMotionData.right.frontServo = joystick.right.x + 90;
			roverMotionData.right.backServo = -joystick.right.x + 90;

//			roverMotionData.debug.steeringY = steeringY;

		}
		let roverMotionDataJson = JSON.stringify(roverMotionData);
		socket.emit("roverStatus", roverMotionData);
		//port.write(roverMotionDataJson + "\n");
	}, 40);
});


/*

const port = new SerialPort({
	path: '/dev/ttyUSB0',
	baudRate: 115200,
});

const parser = new ReadlineParser();
port.pipe(parser);
parser.on('data', console.log);
*/
console.log("Server started");

function inRange(x, min, max)
{
	return x >= min && x <= max;
}


