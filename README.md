# node-pololu-coap
=====
[![Build Status](https://travis-ci.org/sillevl/node-pololu-coap.svg?branch=master)](https://travis-ci.org/sillevl/node-pololu-coap)


__node-pololu-coap__ is a library for for remote controlling the Pololu m3pi robot using CoAP in Node.js

## installation

```
$ npm install node-pololu-coap --save
```
## Basic Example

The following example creates a pololu object and communicates with the pololu gateway using the CoAP protocol:

```js
var pololu = require('./pololu').create("1234567890abcdef", '127.0.01', 5683)

// set the speed to forward 50%
pololu.speed(50)

// turn to the right
pololu.drive(25)

// stop the robot
pololu.stop()

// get the linesensor value
pololu.get_line_sensor(function(value){
  console.log("Linesensor value: " + value)
})

```

## API

  * drive(speed)
  * turn(turnspeed)
  * stop()
  * calibrate()
  * get_line_sensor()

### speed(speed)
Change the speed of the pololu m3pi robot. The argument `speed` can be any value between -100 and 100 (Negative speeds result in the robot driving backwards).


### turn(turnspeed)
Change the turn speed of the pololu m3pi robot. The argument `turnspeed` can be any value between -100 and 100. Negative turnspeeds result in turning to the right, positive turnspeeds result in turning to the left.


### stop()
Stops the robot.


### calibrate()
Calibrates the linesensors.


### get_line_sensor(callback(value))
Get The value of the line sensor. The callback will return the linesensor value. The linesensor value is a number ranging from -100 to 100.
