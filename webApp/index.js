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

let joystick = 
{
    leftx: 0,
    lefty: 0,
    rightx: 0,
    righty: 0 
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
  socket.on("startStream", (arg) => 
  {
    console.log("streamStarted");

    /*let stream = raspividStream();
    stream.on('data', (data) => {
        socket.emit("videoStream", data)
    });*/
  });

  socket.on("joystick", (arg) =>
  {
    joystick["leftx"] = arg.left.x;
    joystick["lefty"] = arg.left.y;
    joystick["rightx"] = arg.right.x;
    joystick["righty"] = arg.right.y;
    let jsonJoystick = JSON.stringify(joystick);
    console.log(jsonJoystick);
    //port.write(jsonJoystick+"\n");
  });
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


