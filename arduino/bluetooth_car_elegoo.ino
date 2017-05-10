
volatile int state = LOW;
char getstr;

// gestion des moteurs droits
int in1=6;
int in2=7;

// gestion des moteurs gauches
int in3=8;
int in4=9;

int ENA=5;
int ENB=11;

// vitesse réduite
int ABS=135;

void _mLeft()
{ 
  // tourner à gauche
  digitalWrite(ENA,HIGH);
  digitalWrite(ENB,HIGH);
  digitalWrite(in1,LOW);
  digitalWrite(in2,HIGH);
  digitalWrite(in3,LOW);
  digitalWrite(in4,HIGH);
  Serial.println("go left !");
}
void _mRight()
{
  // tourner à droite
  digitalWrite(ENA,HIGH);
  digitalWrite(ENB,HIGH);
  digitalWrite(in1,HIGH);
  digitalWrite(in2,LOW);
  digitalWrite(in3,HIGH);
  digitalWrite(in4,LOW);
  Serial.println("go right !");
}
void _mForward()
{
  // marche avant
  digitalWrite(ENA,ABS);
  digitalWrite(ENB,ABS);
  digitalWrite(in1,HIGH);
  digitalWrite(in2,LOW);
  digitalWrite(in3,LOW);
  digitalWrite(in4,HIGH); 
  Serial.println("go forward !");
}
void _mBack()
{
  // marche arrière
  digitalWrite(ENA,ABS);
  digitalWrite(ENB,ABS);
  digitalWrite(in1,LOW);
  digitalWrite(in2,HIGH);
  digitalWrite(in3,HIGH);
  digitalWrite(in4,LOW);
  Serial.println("go back !");
}
void _mStop()
{
  // arrêt complet
  digitalWrite(ENA,LOW);
  digitalWrite(ENB,LOW);
  Serial.println("Stop!");
}
void setup()
{ 
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
  pinMode(in1,OUTPUT);
  pinMode(in2,OUTPUT);
  pinMode(in3,OUTPUT);
  pinMode(in4,OUTPUT);
  pinMode(ENA,OUTPUT);
  pinMode(ENB,OUTPUT);
  _mStop();
}
void loop()
{ 
  getstr=Serial.read();
  if(getstr == 'f')
  {
    _mForward();
  }
  else if(getstr == 'b')
  {
    _mBack();
    //delay(200);
  }
  else if(getstr == 'l')
  {
    _mLeft();
    //delay(200);
  }
  else if(getstr == 'r')
  {
    _mRight();
    //delay(200);
  }
  else if(getstr == 's')
  {
     _mStop();     
  }
}

