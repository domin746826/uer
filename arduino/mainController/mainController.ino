#include <ArduinoJson.h>
#include <Servo.h>

#define READLINE_TIMEOUT 0
#define DATARECEIVED_TIMEOUT 1
#define TIMEOUTERROR_READLINE "timeout: readline()"
#define TIMEOUTERROR_DATARECEIVING "timeout: no motion data"

const int timeouts[] = {500, 50}; //500 ms
long long lastUpdates[] = {0, 0}; //time (in millis) when last data packet was received

/*const uint8_t correctionFL = -7; //angle corrections for servo
const uint8_t correctionFR = -2; //angle decreases - wheel turns left
const uint8_t correctionRL = -4;
const uint8_t correctionRR = 5;*/

const int8_t correctionFL = 1; //angle corrections for servo
const int8_t correctionFR = -6; //angle decreases - wheel turns left
const int8_t correctionRL = -2;
const int8_t correctionRR = 2;

Servo servoFL;
Servo servoFR;
Servo servoRL;
Servo servoRR;

Servo servoCameraHorizontal;
Servo servoCameraVertical;

StaticJsonDocument<512> jsonData;

void setup()
{
  Serial.begin(115200);

  pinMode(22, OUTPUT); //dir2 left rear
  pinMode(23, OUTPUT); //dir1 left front
  pinMode(24, OUTPUT); //dir1 right rear
  pinMode(25, OUTPUT); //dir2 right front

  pinMode(2, OUTPUT); //pwm1 left rear
  pinMode(3, OUTPUT); //pwm1 left front
  pinMode(4, OUTPUT); //pwm1 right rear
  pinMode(5, OUTPUT); //pwm1 right front
  servoFL.attach(6);
  servoRL.attach(7);
  servoFR.attach(8);
  servoRR.attach(9);
  servoCameraHorizontal.attach(10);
  servoCameraVertical.attach(11);

  servoFL.write(90 + correctionFL); //there is no protection against setting too small or too big
  servoFR.write(90 + correctionFR); //angle so you need to limit the angles on the Raspberry Pi
  servoRL.write(90 + correctionRL);
  servoRR.write(90 + correctionRR);

  servoCameraHorizontal.write(90);
  servoCameraVertical.write(90);
  
  updateTimeout(TIMEOUTERROR_DATARECEIVING);
}


void loop() //TODO convert to non-blocking loop
{
  if(checkIfTimeout(DATARECEIVED_TIMEOUT))
    onTimeout(DATARECEIVED_TIMEOUT);

  String receivedLine = readLine();
  if(receivedLine.indexOf(String("timeout")) == 0) //if "timeout" is on 0 position then continue
    return; //void loop() isn't true loop and we can't use continue;
  	
  DeserializationError error = deserializeJson(jsonData, receivedLine);
  if(error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  String jsonType = jsonData["type"];
  if(jsonType.equals("motionData"))
  {
    updateTimeout(DATARECEIVED_TIMEOUT);
    servoFL.write((int) jsonData["left"]["frontServo"] + correctionFL);
    servoRL.write((int) jsonData["left"]["backServo"] + correctionRL);
    servoFR.write((int) jsonData["right"]["frontServo"] + correctionFR);
    servoRR.write((int) jsonData["right"]["backServo"] + correctionRR);

    //conditions always return 1 or 0 so we don't need to put "if" instruction
    digitalWrite(22, jsonData["left"]["backPower"] > 0);
    digitalWrite(23, jsonData["left"]["frontPower"] > 0);
    digitalWrite(24, jsonData["right"]["backPower"] > 0);
    digitalWrite(25, jsonData["right"]["frontPower"] > 0);

    analogWrite(2, abs((int) jsonData["left"]["backPower"])); 
    analogWrite(3, abs((int) jsonData["left"]["frontPower"]));
    analogWrite(4, abs((int) jsonData["right"]["backPower"]));
    analogWrite(5, abs((int) jsonData["right"]["frontPower"]));
  }
  else if(jsonType.equals("cameraMotionData"))
  {
    servoCameraHorizontal.write((int) jsonData["hAngle"]);
    servoCameraVertical.write((int) jsonData["vAngle"]);
  }

}

void onTimeout(int timeoutVariant)
{
  

  switch(timeoutVariant)
  {
    case READLINE_TIMEOUT:    
      Serial.println(TIMEOUTERROR_READLINE);
      break;

    case DATARECEIVED_TIMEOUT:
    servoFL.write(90 + correctionFL);
  servoRL.write(90 + correctionRL);
  servoFR.write(90 + correctionFR);
  servoRR.write(90 + correctionRR);

  analogWrite(2, 0); 
  analogWrite(3, 0);
  analogWrite(4, 0);
  analogWrite(5, 0);
      Serial.println(TIMEOUTERROR_DATARECEIVING);
      break;

    default:
      Serial.println("timeout: unknown");
      break;
  }
}

void updateTimeout(int timeoutVariant)
{
  lastUpdates[timeoutVariant] = millis();
}

bool checkIfTimeout(int timeoutVariant)
{
  return millis() - lastUpdates[timeoutVariant] > timeouts[timeoutVariant];
}

String readLine()
{
  updateTimeout(READLINE_TIMEOUT);
  String line;
  char c = 0;
  while(c != '\n')
  {  
    while(!Serial.available() && !checkIfTimeout(READLINE_TIMEOUT)){}
    if(!Serial.available())
    {
      onTimeout(READLINE_TIMEOUT);
      return TIMEOUTERROR_READLINE;
    }
    updateTimeout(READLINE_TIMEOUT);
    c = Serial.read();
    line += c;
  }
  int lastIndex = line.length() - 1;
  line.remove(lastIndex);
  return line;
}