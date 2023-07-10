#include <ArduinoJson.h>
//#include <Servo.h>

#define READLINE_TIMEOUT 0
#define DATARECEIVED_TIMEOUT 1
#define TIMEOUTERROR_READLINE "timeout: readline()"
#define TIMEOUTERROR_DATARECEIVING "timeout: no arm data"

const int timeouts[] = {500, 50}; //500 ms
long long lastUpdates[] = {0, 0}; //time (in millis) when last data packet was received


StaticJsonDocument<512> jsonData;
int8_t stepperOneDir = 0;
int8_t stepperTwoDir = 0;
int8_t stepperThreeDir = 0;
int8_t stepperFourDir = 0;

//Servo gripper;

void setup()
{
  Serial.begin(115200);
  pinMode(22, OUTPUT); //step joint1 horizontal
  pinMode(23, OUTPUT); //step joint2 vertical1
  pinMode(24, OUTPUT); //step joint3 vertical2
  pinMode(25, OUTPUT); //step joint4 vertical holder

  pinMode(26, OUTPUT); //dir joint1 horizontal PA4
  pinMode(27, OUTPUT); //dir joint2 vertical1 PA5
  pinMode(28, OUTPUT); //dir joint3 vertical2 PA6
  pinMode(29, OUTPUT); //dir joint4 vertical holder PA7

  pinMode(30, OUTPUT); //enable

  TCCR1A = 0;
  TCCR3A = 0;
  TCCR4A = 0;
  TCCR5A = 0;

  TCCR1B = (1<<CS10) | (1<<CS11) | (1<<WGM12);
  TCCR3B = (1<<CS30) | (1<<CS31) | (1<<WGM32);
  TCCR4B = (1<<CS40) | (1<<CS41) | (1<<WGM42);
  TCCR5B = (1<<CS50) | (1<<CS51) | (1<<WGM52);

  OCR1A = 10000;
  OCR3A = 10000;
  OCR4A = 10000;
  OCR5A = 10000;


  TIMSK1 = (1<<OCIE1A);
  TIMSK3 = (1<<OCIE3A);
  TIMSK4 = (1<<OCIE4A);
  TIMSK5 = (1<<OCIE5A);
  sei();
  //gripper.attach

  
  updateTimeout(TIMEOUTERROR_DATARECEIVING);
}
//TODO timery dać z dokumentacji na przerwaniu, odbieranie jsona, millis sprawdzający ostatni pakiet na zerowanie tych timerów i dać 30 na 0 w timeoucie
//zrobić kopiuj wklej strony mobile do roboticArm, zmienić nazwy pakietów w socketio, podpiąc wszystkie 4 gałki

ISR(TIMER1_COMPA_vect)
{
  if(stepperOneDir == 0)
    return;
  PORTA ^= (1<<PA0);
  if(stepperOneDir > 0)
    digitalWrite(26, HIGH);
  else
    digitalWrite(26, LOW);
}
ISR(TIMER3_COMPA_vect)
{
  if(stepperTwoDir == 0)
    return;
  PORTA ^= (1<<PA1);
  if(stepperTwoDir > 0)
    digitalWrite(27, HIGH);
  else
    digitalWrite(27, LOW);
}
ISR(TIMER4_COMPA_vect)
{
  if(stepperThreeDir == 0)
    return;
  PORTA ^= (1<<PA2);
  if(stepperThreeDir > 0)
    digitalWrite(28, HIGH);
  else
    digitalWrite(28, LOW);
}
ISR(TIMER5_COMPA_vect)
{
  if(stepperFourDir == 0)
    return;
  PORTA ^= (1<<PA3);
  if(stepperFourDir > 0)
    digitalWrite(29, HIGH);
  else
    digitalWrite(29, LOW);
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
  if(jsonType.equals("roboticArmData"))
  {
    updateTimeout(DATARECEIVED_TIMEOUT);
    int firstJoint = jsonData["firstJoint"];
    int secondJoint = jsonData["secondJoint"];
    int thirdJoint = jsonData["thirdJoint"];
    int fourthJoint = jsonData["fourthJoint"];



    


    if(firstJoint >= 10)
    {
      stepperOneDir = 1;
      OCR1A = firstJoint;
    }
    else if(firstJoint <= -10)
    {
      stepperOneDir = -1;
      OCR1A = -firstJoint;
    }
    else
    {
      stepperOneDir = 0;
      OCR1A = 20000;
    }

    if(secondJoint >= 10)
    {
      stepperTwoDir = 1;
      OCR3A = secondJoint;
    }
    else if(secondJoint <= -10)
    {
      stepperTwoDir = -1;
      OCR3A = -secondJoint;
    }
    else
    {
      stepperTwoDir = 0;
      OCR3A = 20000;
    }


    if(thirdJoint >= 10)
    {
      stepperThreeDir = 1;
      OCR4A = thirdJoint;
    }
    else if(thirdJoint <= -10)
    {
      stepperThreeDir = -1;
      OCR4A = -thirdJoint;
    }
    else
    {
      stepperThreeDir = 0;
      OCR4A = 20000;
    }


    if(fourthJoint >= 10)
    {
      stepperFourDir = 1;
      OCR5A = fourthJoint;
    }
    else if(fourthJoint <= -10)
    {
      stepperFourDir = -1;
      OCR5A = -fourthJoint;
    }
    else
    {
      stepperFourDir = 0;
      OCR5A = 20000;
    }

    //TODO update timers and dirs
  }
  else if(jsonType.equals("identifyDevice"))
  {
    Serial.println("roboticArm");
  }
  else if(jsonType.equals("enable"))
  {
    digitalWrite(30, HIGH);    
  }
  else if(jsonType.equals("disable"))
  {
    digitalWrite(30, LOW);    
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
      OCR1A = 10000;
      OCR3A = 10000;
      OCR4A = 10000;
      OCR5A = 10000;
      digitalWrite(30, LOW);
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
