// pins for the LEDs:
const int redPin = 3;
const int greenPin = 5;
const int bluePin = 6;

//control constants
const int enableInt = 999;
const int disableInt = 998;

void setup() {

  // init serial:
  Serial.begin(9600);

  // define the pins as output
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  initBlink();
}


void loop() {

  while (Serial.available() > 0) {

    // look for integers in the incoming serial stream:
    
    int red = Serial.parseInt();
    
    //power managment is based of first int and can enable or disable LED
    powerManagment(red);

    int green = Serial.parseInt();
    int blue = Serial.parseInt();

    printRgbToSerialMonitor(red,green,blue);

    // look for the newline. That's the end of your sentence:
    if (Serial.read() == 'X') {
      
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      //set Final Color
      setColor(red, green, blue);
    }

  }
}

void setColor(int red, int green, int blue)
{
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);
}

void initBlink()
{
  for ( int a = 0; a <= 2; a = a + 1 ) {
    setColor(255, 0, 0);
    delay(250);
    setColor(0, 255, 0);
    delay(250);
    setColor(0, 0, 255);
    delay(250);
  }
  setColor(255, 255, 255);
}

void powerManagment(int X) {
  //disable LED
  if (X == disableInt) {
    setColor(0, 0, 0);
  }
  if (X == enableInt) {
    initBlink();
  }

}

void printRgbToSerialMonitor(int r, int g, int b)
{
    Serial.print(r);
    Serial.print(",");
    Serial.print(g);
    Serial.print(",");
    Serial.print(g);
    Serial.println();  
}
