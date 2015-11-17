var pololu = require('./pololu').create("1234567890abcdef", 5683, '10.182.34.102')

console.log("Drive:" + pololu.drive(100))
