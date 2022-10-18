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

let dpad = 
{
	horizontal: 0,
	vertical: 0
};

let filteredDpad =
{
	horizontal: 0,
	vertical: 0
};

/*window.addEventListener('gc.controller.found', function(event)
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

		case 'DPAD_LEFT':
			dpad.horizontal = -1;
			break;
		case 'DPAD_RIGHT':
			dpad_horizontal = 1;
			break;
		case 'DPAD_UP':
			dpad_vertical = 1;
			break;
		case 'DPAD_DOWN':
			dpad_vertical = -1;
			break;
		case 'DPAD_LEFT':
			dpad.horizontal = -1;
			break;
		case 'DPAD_RIGHT':
			dpad_horizontal = 1;
			break;
		case 'DPAD_UP':
			dpad_vertical = 1;
			break;
		case 'DPAD_DOWN':
			dpad_vertical = -1;
			break;
	}
}, false);

window.addEventListener('gc.button.hold', (event) =>
{
	switch(event.detail.name)
	{
		case 'DPAD_LEFT':
			dpad.horizontal = -1;
			break;
		case 'DPAD_RIGHT':
			dpad_horizontal = 1;
			break;
		case 'DPAD_UP':
			dpad_vertical = 1;
			break;
		case 'DPAD_DOWN':
			dpad_vertical = -1;
			break;
		case 'DPAD_LEFT':
			dpad.horizontal = -1;
			break;
		case 'DPAD_RIGHT':
			dpad_horizontal = 1;
			break;
		case 'DPAD_UP':
			dpad_vertical = 1;
			break;
		case 'DPAD_DOWN':
			dpad_vertical = -1;
			break;
	}
}, false);


window.addEventListener('gc.button.release', (event) =>
{
	switch(event.detail.name)
	{
		case 'DPAD_LEFT':
		case 'DPAD_RIGHT':
			dpad_horizontal = 0;
			break;
		case 'DPAD_UP':
		case 'DPAD_DOWN':
			dpad_vertical = 0;
			break;
		
		case 'DPAD_LEFT':
		case 'DPAD_RIGHT':
			dpad_horizontal = 0;
			break;
		case 'DPAD_UP':
		case 'DPAD_DOWN':
			dpad_vertical = 0;
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
      rawJoystick.left.y = (rawJoystick.left.y * rawJoystick.left.y * rawJoystick.left.y) / 10000;

		}
		break;

		case 'RIGHT_ANALOG_STICK':
		{
			rawJoystick.right.y = -Math.floor(event.detail.position.y*100);
			rawJoystick.right.x = Math.floor(event.detail.position.x*100);
      			rawJoystick.right.x = (rawJoystick.right.x * rawJoystick.right.x * rawJoystick.right.x) / 10000;
			console.log(rawJoystick.right.x + " " + rawJoystick.right.y);
		}
		break;
	}
}*/

window.setInterval(function()
{
  rawJoystick.left.x=joyLeft.GetX();
  rawJoystick.left.y=joyLeft.GetY();//*joyLeft.getY()*joyLeft.getY()/10000;
  rawJoystick.right.x=joyRight.GetX();//*joyRight.getX()*joyRight.getX()/10000;
  rawJoystick.right.y=joyRight.GetY();
}, 50);




