window.setInterval(() =>
{
	socket.emit("joystick", filteredJoystick);
}, 40);


function onRoverStatus(arg)
{
	currentRoverStatus = arg;
}


window.setInterval(() =>
{
	displayFps(Math.round(fps));
}, 200);

function redrawJoystick(joystickCanvas, x, y)
{
	let angle = Math.atan2(y, x);
	let magnitude = Math.sqrt(x*x + y*y);

	if(magnitude > 100) magnitude = 100;

	xInCircle = magnitude * Math.cos( angle );
	yInCircle = magnitude * Math.sin( angle );

	let ctx = joystickCanvas.getContext("2d");

	ctx.clearRect(0, 0, joystickCanvas.width, joystickCanvas.height);
	ctx.beginPath();
	ctx.arc(50+xInCircle/2, 50-yInCircle/2, 20, 0, 2 * Math.PI); //draw filled circle on position
	ctx.stroke();
	ctx.fillStyle = 'gray';
	ctx.fill();
}

function redrawRoverVisualisation(roverCanvas, roverStatus)
{
	let ctx = roverCanvas.getContext("2d");
	ctx.clearRect(0, 0, roverCanvas.width, roverCanvas.height);

	ctx.fillStyle = '#ddddff';

	drawWheel(ctx, 50+214/2, 50, currentRoverStatus.right.frontServo);
	drawWheel(ctx, 50, 50, currentRoverStatus.left.frontServo);
	drawWheel(ctx, 50+214/2, 50+384/2, currentRoverStatus.right.backServo);
	drawWheel(ctx, 50, 50+384/2, currentRoverStatus.left.backServo);
}

function drawWheel(ctx, x, y, angle)
{
	ctx.translate(x, y);
	ctx.rotate( (Math.PI / 180) * (angle));
	ctx.fillRect(-20, -5, 40, 10);
	ctx.resetTransform();
}



function gameLoop()
{
	let time = performance.now();
	window.requestAnimationFrame(gameLoop);  
	const delta = ( time - prevTime ) / 1000;
       	fps = (15*fps + 1/delta)/16;

	//smoothing joystick moves
	filteredJoystick.left.x += clamp(rawJoystick.left.x - filteredJoystick.left.x, -5, 5);
       	filteredJoystick.left.y += clamp(rawJoystick.left.y - filteredJoystick.left.y, -5, 5);
       	filteredJoystick.right.x += clamp(rawJoystick.right.x - filteredJoystick.right.x, -3, 3);
       	filteredJoystick.right.y += clamp(rawJoystick.right.y - filteredJoystick.right.y, -5, 5);

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



