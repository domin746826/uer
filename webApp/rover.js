window.setInterval(() =>
{
	switch(roverMode)
  {
    case 1:
      socket.emit("joystick", filteredJoystick);
      break;

    case 2:
      socket.emit("roboticArm", roboticArmData);
      break;
  }
}, 50);

window.setInterval(() =>
{
	if(roboticArmState == 1)
	{
socket.emit("enableArm");
armModeHandler.innerText = "enabled";
}
	else
{
	socket.emit("disableArm");
armModeHandler.innerText = "disable";
}

}, 200);


function onRoverStatus(arg)
{
	currentRoverStatus = arg;
}


window.setInterval(() =>
{
	displayFps(Math.round(fps));
}, 200);

window.setInterval(() =>
{
	if(roverMode == 1)
    socket.emit("dpad", optimizedDpad);
  
}, 20);

window.setInterval(() =>
{
	if(roverMode == 2)
    socket.emit("grabber", grabber);
  
}, 50);

function redrawJoystick(joystickCanvas, x, y)
{
	//let angle = Math.atan2(y, x);
	//let magnitude = Math.sqrt(x*x + y*y);

	//if(magnitude > 100) magnitude = 100;

	//xInCircle = magnitude * Math.cos( angle );
	//yInCircle = magnitude * Math.sin( angle );

	let ctx = joystickCanvas.getContext("2d");

	ctx.clearRect(0, 0, joystickCanvas.width, joystickCanvas.height);
	ctx.beginPath();
	//ctx.arc(50+xInCircle/2, 50-yInCircle/2, 20, 0, 2 * Math.PI); //draw filled circle on position
	ctx.arc(50+x/2, 50-y/2, 20, 0, 2 * Math.PI); //draw filled circle on position
	ctx.stroke();
	ctx.fillStyle = 'gray';
	ctx.fill();
}

function redrawRoverVisualisation(roverCanvas, roverStatus)
{
	let ctx = roverCanvas.getContext("2d");
	ctx.clearRect(0, 0, roverCanvas.width, roverCanvas.height);

	ctx.fillStyle = '#ddddff';

	drawWheel(ctx, 300+227/2, 300-384/2, currentRoverStatus.right.frontServo);
	drawWheel(ctx, 300-227/2, 300-384/2, currentRoverStatus.left.frontServo);
	drawWheel(ctx, 300+227/2, 300+384/2, currentRoverStatus.right.backServo);
	drawWheel(ctx, 300-227/2, 300+384/2, currentRoverStatus.left.backServo);
	
	ctx.beginPath();
	ctx.moveTo(300+227/2, 300-384/2);
	ctx.lineTo(currentRoverStatus.debug.steeringRadius/2+300, currentRoverStatus.debug.steeringY/2+300);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(300-227/2, 300-384/2);
	ctx.lineTo(currentRoverStatus.debug.steeringRadius/2+300, currentRoverStatus.debug.steeringY/2+300);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(300+227/2, 300+384/2);
	ctx.lineTo(currentRoverStatus.debug.steeringRadius/2+300, currentRoverStatus.debug.steeringY/2+300);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(300-227/2, 300+384/2);
	ctx.lineTo(currentRoverStatus.debug.steeringRadius/2+300, currentRoverStatus.debug.steeringY/2+300);
	ctx.stroke();
}

function drawWheel(ctx, x, y, angle)
{
	ctx.translate(x, y);
	ctx.rotate( (Math.PI / 180) * (angle));
	ctx.fillRect(-20, -5, 40, 10);
	ctx.resetTransform();
}

function initRover()
{
	//smoothing joystick moves
	let joystickSmooth = setInterval(() =>
	{
		filteredJoystick.left.x += clamp(rawJoystick.left.x - filteredJoystick.left.x, -16, 16);
	  filteredJoystick.left.y += clamp(rawJoystick.left.y - filteredJoystick.left.y, -16, 16);
    filteredJoystick.right.x += clamp(rawJoystick.right.x - filteredJoystick.right.x, -8, 8);
	  filteredJoystick.right.y += clamp(rawJoystick.right.y - filteredJoystick.right.y, -8, 8);
	}, 25);

	let cameraSmooth = setInterval(() => 
	{
		//filteredDpad.horizontal += dpad.horizontal*1;
		filteredDpad.vertical += dpad.vertical*2;
		filteredDpad.vertical = clamp(filteredDpad.vertical, -90, 90);
   
    if(dpad.horizontal == 0)
    {
      if(dpadHorizVal > 0.1)
        dpadHorizVal -= 0.1;
      else if(dpadHorizVal < -0.1)
        dpadHorizVal += 0.1;
      else
        dpadHorizVal = 0;
    }
    else
    {
      filteredDpad.horizontal += dpadHorizVal;
      dpadHorizVal += dpad.horizontal*0.05;
      dpadHorizVal = clamp(dpadHorizVal, -1, 1);
    }

		filteredDpad.horizontal = clamp(filteredDpad.horizontal, -90, 90);
    
    optimizedDpad.vertical = Math.floor(filteredDpad.vertical);
    optimizedDpad.horizontal = Math.floor(filteredDpad.horizontal);


	}, 20);

}

function gameLoop()
{
	let time = performance.now();
	window.requestAnimationFrame(gameLoop);  
	const delta = ( time - prevTime ) / 1000;
       	fps = (15*fps + 1/delta)/16;

	redrawJoystick(joystickLeftCanvas, filteredJoystick.left.x, filteredJoystick.left.y);
	redrawJoystick(joystickRightCanvas, filteredJoystick.right.x, filteredJoystick.right.y);
	redrawRoverVisualisation(roverVisualisationCanvas, currentRoverStatus);

        prevTime = time;
}


function displayFps(fps)
{
	fpsHandler.textContent = fps;
}

function clamp(number, min, max)
{
	return Math.max(min, Math.min(number, max));
}



