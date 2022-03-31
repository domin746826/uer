let rawJoystick = 
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

let filteredJoystick = 
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

window.addEventListener('gc.controller.found', function(event)
{
	var controller = event.detail.controller;
	console.log("Controller found at index " + controller.index + ".");
	console.log("'" + controller.name + "' is ready!");
}, false);

window.addEventListener('gc.analog.start', onJoystickChange);
window.addEventListener('gc.analog.hold', onJoystickChange);
window.addEventListener('gc.analog.change', onJoystickChange);
window.addEventListener('gc.analog.end', onJoystickChange);

window.addEventListener('gc.button.press', (event) =>
{
	switch(event.detail.name)
	{
		case 'START':
			console.log("started");
			break;
	}
}, false);

function onJoystickChange(event)
{
	var stick = event.detail;
	switch(event.detail.name)
	{
		case 'LEFT_ANALOG_STICK':
		{
			rawJoystick.left.x = Math.floor(event.detail.position.x*100);
			rawJoystick.left.y = -Math.floor(event.detail.position.y*100);
		}
		break;

		case 'RIGHT_ANALOG_STICK':
		{
			rawJoystick.right.x = Math.floor(event.detail.position.x*100);
			rawJoystick.right.y = -Math.floor(event.detail.position.y*100);
		}
		break;
	}
}
