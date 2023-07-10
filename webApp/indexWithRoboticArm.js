/*const raspi = require('raspi'); const gpio = require('raspi-gpio');
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
const { spawn } = require("child_process");

let portMovement, portRoboticArm;

let portsReady = false;

let checkType =
{
  type: "identifyDevice"
};

let enableArm = 
{
type: "enable"
};

let disableArm = 
{

type: "disable"
};

const port = new SerialPort({
	path: '/dev/ttyUSB0',
	baudRate: 115200,
});

/*const port2 = new SerialPort({
	path: '/dev/ttyUSB1',
	baudRate: 115200,
});*/


setTimeout(()=>
{
  port.write(JSON.stringify(checkType)+"\n");
  console.log(JSON.stringify(checkType));
  console.log("sent device identify packet");
}, 1800);

const parser = new ReadlineParser();
port.pipe(parser);
parser.on('data', (arg)=>
{
  console.log(arg); 
  if(arg.includes("movement"))
  {

    console.log("got it, ttyUSB0 is movement")
    portMovement = port;
    portRoboticArm = new SerialPort({
      path: '/dev/ttyUSB1', baudRate: 115200});
    portsReady = true;
  }
  else if(arg == "roboticArm")
  {
    console.log("got it, ttyUSB1 is movement")
    portRoboticArm = port;
    portMovement = new SerialPort({
      path: '/dev/ttyUSB1', baudRate: 115200});
    portsReady = true;
  }
});



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

let grabber =
{
  val: 90
};

let roboticArmData =
{
  type: "roboticArmData",
  firstJoint: 0,
  secondJoint: 0,
  thirdJoint: 0,
  fourthJoint: 0
};



let cameraMotionData = 
{
	type: "cameraMotionData",
	hAngle: 90,
	vAngle: 90
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


  socket.on("roboticArm", (arg) =>
  {
    roboticArmData = arg;
  });

  socket.on("grabber", (arg) =>
  {
    grabber = arg;
  });

socket.on("enableArm", (arg) =>
{
if(portsReady)
	portRoboticArm.write(JSON.stringify(enableArm)+'\n');
console.log("\n\nenabledarm\n\n");
});

socket.on("disableArm", (arg) =>
{
if(portsReady)
	portRoboticArm.write(JSON.stringify(disableArm)+'\n');
});



  let grabberData = setInterval(()=>
  {
    if(portsReady)
    {
      portMovement.write(JSON.stringify(grabber)+"\n");
    }
  }, 80);

  let roboticArmLoop = setInterval(()=>
  {
    if(portsReady)
    {
      portRoboticArm.write(JSON.stringify(roboticArmData)+"\n");
      console.log(JSON.stringify(roboticArmData)+"\n");
    }
  }, 50);

	socket.on("joystick", (arg) =>
	{
		joystick = arg;
	});

	socket.on("dpad", (arg) =>
	{
		cameraMotionData.hAngle = Math.floor(arg.horizontal + 90);
		cameraMotionData.vAngle = Math.floor(arg.vertical + 90);
	});

	let cameraData = setInterval(() =>

	{	
		let cameraMotionDataJson = JSON.stringify(cameraMotionData);
		socket.emit("cameraMotionData", cameraMotionData);
		if(portsReady)
      portMovement.write(cameraMotionDataJson + "\n");
	}, 20);


	let roverLoop = setInterval(()=>
	{	
		//TODO calculate wheels speed and direction from object "joystick" and put it in "roverMotionData"
		//roverX is distance from center to outer wheels in X axis
		//roverY is distance from center to outer wheels in Y axis
		//(we assume here that the Y and Z axes are swapped)
		let roverX = 227;
		let roverY = 384;
	
		let steeringRadius;
		let steeringY;

		if(!inRange(joystick.right.x, -1, 1))
		{
			steeringRadius = 30000 / joystick.right.x;
			steeringY = joystick.right.y * 3.8;
			roverSteeringCalculated.left.front = (Math.atan((steeringY+roverY) / (steeringRadius + roverX)) * 180) / Math.PI;
			roverSteeringCalculated.left.back = (Math.atan((steeringY-roverY) / (steeringRadius + roverX)) * 180) / Math.PI;
			roverSteeringCalculated.right.front = (Math.atan((steeringY+roverY) / (steeringRadius - roverX)) * 180) / Math.PI;
			roverSteeringCalculated.right.back = (Math.atan((steeringY-roverY) / (steeringRadius - roverX)) * 180) / Math.PI;

			roverMotionData.left.frontServo = Math.floor(roverSteeringCalculated.left.front + 90);
			roverMotionData.left.backServo = Math.floor(roverSteeringCalculated.left.back + 90);
			roverMotionData.right.frontServo = Math.floor(roverSteeringCalculated.right.front + 90);
			roverMotionData.right.backServo = Math.floor(roverSteeringCalculated.right.back + 90);

			
			roverMotionData.left.frontServo = Math.floor(clamp(roverMotionData.left.frontServo, 10, 170));
			roverMotionData.left.backServo = Math.floor(clamp(roverMotionData.left.backServo, 10, 170));
			roverMotionData.right.frontServo = Math.floor(clamp(roverMotionData.right.frontServo, 10, 170));
			roverMotionData.right.backServo = Math.floor(clamp(roverMotionData.right.backServo, 10, 170));

			roverMotionData.debug.steeringRadius = Math.floor(steeringRadius);
			roverMotionData.debug.steeringY = Math.floor(steeringY);


			let radiusDistance = Math.sqrt(Math.pow(steeringRadius, 2)+Math.pow(steeringY, 2))/100;
			let powerLB = Math.floor(Math.sqrt(Math.pow(steeringY-roverY, 2) + Math.pow(steeringRadius+roverX, 2))/radiusDistance)/100;	
			let powerLF = Math.floor(Math.sqrt(Math.pow(steeringY+roverY, 2) + Math.pow(steeringRadius+roverX, 2))/radiusDistance)/100;
			let powerRB = Math.floor(Math.sqrt(Math.pow(steeringY-roverY, 2) + Math.pow(steeringRadius-roverX, 2))/radiusDistance)/100;
			let powerRF = Math.floor(Math.sqrt(Math.pow(steeringY+roverY, 2) + Math.pow(steeringRadius-roverX, 2))/radiusDistance)/100;

      let powerJoystick = joystick.left.y;
      if(radiusDistance < 5 && joystick.right.x != 0)
        powerJoystick = (powerJoystick*radiusDistance) / 6;
			roverMotionData.left.frontPower = Math.floor(powerLF*(powerJoystick/2));
			roverMotionData.left.backPower = Math.floor(powerLB*(powerJoystick/2));
			roverMotionData.right.frontPower = Math.floor(powerRF*(powerJoystick/2));
			roverMotionData.right.backPower = Math.floor(powerRB*(powerJoystick/2));
		}
		else
		{			
			roverMotionData.left.frontServo = Math.floor(joystick.right.x + 90);
			roverMotionData.left.backServo = Math.floor(-joystick.right.x + 90);
			roverMotionData.right.frontServo = Math.floor(joystick.right.x + 90);
			roverMotionData.right.backServo = Math.floor(-joystick.right.x + 90);

			roverMotionData.left.frontServo = Math.floor(clamp(roverMotionData.left.frontServo, 10, 170));
			roverMotionData.left.backServo = Math.floor(clamp(roverMotionData.left.backServo, 10, 170));
			roverMotionData.right.frontServo = Math.floor(clamp(roverMotionData.right.frontServo, 10, 170));
			roverMotionData.right.backServo = Math.floor(clamp(roverMotionData.right.backServo, 10, 170));

			roverMotionData.left.frontPower = Math.floor(joystick.left.y/2);
			roverMotionData.left.backPower = Math.floor(joystick.left.y/2);
			roverMotionData.right.frontPower = Math.floor(joystick.left.y/2);
			roverMotionData.right.backPower = Math.floor(joystick.left.y/2);

//			roverMotionData.debug.steeringY = steeringY;

		}


		//console.log(powerLF + " " + powerRF + "        " + powerLB + " " + powerRB + "        radiusDistance" + Math.floor(radiusDistance*100)/100); 

		let roverMotionDataJson = JSON.stringify(roverMotionData);
		socket.emit("roverStatus", roverMotionData);
		if(portsReady)
		  portMovement.write(roverMotionDataJson + "\n");
	}, 60);


});


console.log("Server started");

/*
const ls = spawn("/usr/bin/sh", ["start.sh"]);
ls.stdout.on("data", data =>
{
	console.log(`stdout: ${data}`);
});
ls.stderr.on("data", data =>
{
	console.log(`stderr: ${data}`);
});
ls.on('error', (error) =>
{
	console.log(`error: ${error.message}`);
});
ls.on("close", code =>
{
	console.log(`child process exited with code ${code}`);
});*/

function inRange(x, min, max)
{
	return x >= min && x <= max;
}

function clamp(number, min, max)
{
        return Math.max(min, Math.min(number, max));
}
