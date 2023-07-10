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

let grabber =
{
  val: 90
};



let optimizedDpad =
{
	horizontal: 0,
	vertical: 0
};


let roboticArmData =
{
  type: "roboticArmData",
  firstJoint: 0,
  secondJoint: 0,
  thirdJoint: 0,
  fourthJoint: 0
};

let dpadHorizVal = 0;

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
  if(event.detail.name == 'SELECT')
  {
    roverMode++;
    if(roverMode == 3)
      roverMode = 0;
    switch(roverMode)
    {
      case 0:
        modeHandler.innerText = "idle";
        break;
      case 1:
        modeHandler.innerText = "move";
        break;
      case 2:
        modeHandler.innerText = "roboticArm";
        break;
    }
  }
if(event.detail.name == "START")
{
console.log("changed state");
if(roboticArmState == 1)
	roboticArmState = 0;
else
	roboticArmState = 1;
}


  //if(roverMode == 1)
  //{
    switch(event.detail.name)
    {
      case 'START':
        console.log("started");
        break;

      case 'DPAD_LEFT':
        dpad.horizontal = -1;
        break;
      case 'DPAD_RIGHT':
        dpad.horizontal = 1;
        break;
      case 'DPAD_UP':
        dpad.vertical = 1;
        break;
      case 'DPAD_DOWN':
        dpad.vertical = -1;
        break;
      case 'DPAD_LEFT':
        dpad.horizontal = -1;
        break;
      case 'DPAD_RIGHT':
        dpad.horizontal = 1;
        break;
      case 'DPAD_UP':
        dpad.vertical = 1;
        break;
      case 'DPAD_DOWN':
        dpad.vertical = -1;
        break;

      case 'RIGHT_SHOULDER':
        grabber.val+=5;
        if(grabber.val > 180)
          grabber.val = 180;
        console.log("nie");
        break;

      case 'LEFT_SHOULDER':
        grabber.val -=5;
        if(grabber.val < 0)
          grabber.val = 0;
        break;

    }
  /*}
  else if(roverMode == 2) //roboticArm
  {
    //todo dpad
  }*/
}, false);

window.addEventListener('gc.button.hold', (event) =>
{
	switch(event.detail.name)
	{
		case 'DPAD_LEFT':
			dpad.horizontal = -1;
			break;
		case 'DPAD_RIGHT':
			dpad.horizontal = 1;
			break;
		case 'DPAD_UP':
			dpad.vertical = 1;
			break;
		case 'DPAD_DOWN':
			dpad.vertical = -1;
			break;
	}
}, false);


window.addEventListener('gc.button.release', (event) =>
{
	switch(event.detail.name)
	{
		case 'DPAD_LEFT':
		case 'DPAD_RIGHT':
      dpad.horizontal = 0;
		break;
		case 'DPAD_UP':
		case 'DPAD_DOWN':
			dpad.vertical = 0;
			break;
		
			break;
	}
}, false);

function onJoystickChange(event)
{
	var stick = event.detail;


  if(roverMode == 1)
  {
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
      }
      break;
    }
  }
  else if(roverMode == 2)
  {
    switch(event.detail.name)
    {
      case 'LEFT_ANALOG_STICK':
      {
        if(event.detail.position.x == 0)
        {
          roboticArmData.firstJoint = 0;
        }
        else
        {
          roboticArmData.firstJoint = Math.floor(10/event.detail.position.x);
          if(roboticArmData.firstJoint > 10000)
            roboticArmData.firstJoint = 10000;
        }


        if(event.detail.position.y == 0)
        {
          roboticArmData.secondJoint = 0;
        }
        else
        {
          roboticArmData.secondJoint = Math.floor(10/event.detail.position.y);
          if(roboticArmData.secondJoint > 10000)
            roboticArmData.secondJoint = 10000;
        }
      }
      break;

      case 'RIGHT_ANALOG_STICK':
      {
        if(event.detail.position.x == 0)
        {
          roboticArmData.thirdJoint = 0;
        }
        else
        {
          roboticArmData.thirdJoint = Math.floor(10/event.detail.position.x);
          if(roboticArmData.thirdJoint > 10000)
            roboticArmData.thirdJoint = 10000;
        }


        if(event.detail.position.y == 0)
        {
          roboticArmData.fourthJoint = 0;
        }
        else
        {
          roboticArmData.fourthJoint = Math.floor(10/event.detail.position.y);
          if(roboticArmData.fourthJoint > 10000)
            roboticArmData.fourthJoint = 10000;
        }
      }
      break;
    }
    //roboticArmData.secondJoint = 0;
    //roboticArmData.thirdJoint = 0;
    //roboticArmData.fourthJoint = 0;

  }
}
