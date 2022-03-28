window.setInterval(() =>
{
	socket.emit("joystick", filteredJoystick);
}, 40);


function onRoverStatus(arg)
{
	//TODO display simplified 2D rover status
	console.log(arg);
}


window.setInterval(() =>
{
	displayFps(Math.round(fps));
}, 200);



function gameLoop()
{
	let time = performance.now();
	window.requestAnimationFrame(gameLoop);  
	const delta = ( time - prevTime ) / 1000;
       	fps = (15*fps + 1/delta)/16;

	//smoothing joystick moves
	filteredJoystick.left.x += clamp(rawJoystick.left.x - filteredJoystick.left.x, -5, 5);
       	filteredJoystick.left.y += clamp(rawJoystick.left.y - filteredJoystick.left.y, -5, 5);
       	filteredJoystick.right.x += clamp(rawJoystick.right.x - filteredJoystick.right.x, -5, 5);
       	filteredJoystick.right.y += clamp(rawJoystick.right.y - filteredJoystick.right.y, -5, 5);


	redrawJoystick(joystickLeftCanvas, filteredJoystick.left.x, filteredJoystick.left.y);
	redrawJoystick(joystickRightCanvas, filteredJoystick.right.x, filteredJoystick.right.y);

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



