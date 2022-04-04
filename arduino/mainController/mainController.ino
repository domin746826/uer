#include <ArduinoJson.h>
#include <Servo.h>

Servo servoFL;
Servo servoFR;
Servo servoRL;
Servo servoRR;

StaticJsonDocument<512> jsonData;

const int timeout = 500; //500 ms
long long lastDataTime = 0; //time (in millis) when last data packet was received

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

  //angle decreases - wheel turns left
  servoFL.write(83); //-7
  servoFR.write(88); // -2
  servoRL.write(86); // -4
  servoRR.write(95); //-5
}


void loop()
{
  String receivedLine = readLine();
  if(receivedLine.equals(String("timeout")))
  {
    onTimeout();
    return; //void loop() isn't true loop and we can't use continue;
  }
  	
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
    servoFL.write((int) jsonData["left"]["frontServo"] - 7);
    servoRL.write((int) jsonData["left"]["backServo"] - 4);
    servoFR.write((int) jsonData["right"]["frontServo"] - 2);
    servoRR.write((int) jsonData["right"]["backServo"] + 5);

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

}

void onTimeout()
{
  servoFL.write(90 - 7);
  servoRL.write(90 - 4);
  servoFR.write(90 - 2);
  servoRR.write(90 + 5);

  analogWrite(2, 0); 
  analogWrite(3, 0);
  analogWrite(4, 0);
  analogWrite(5, 0);
}

void updateTimeout()
{
  lastDataTime = millis();
}

bool checkIfTimeout()
{
  return millis() - lastDataTime > timeout;
}


String readLine()
{
  updateTimeout();
  String line;
  char c = 0;
  while(c != '\n')
  {  
    while(!Serial.available() && !checkIfTimeout()){}
    if(!Serial.available())
    	return "timeout";
    updateTimeout();
    c = Serial.read();
    line += c;
  }
  int lastIndex = line.length() - 1;
  line.remove(lastIndex);
  return line;
}
