var Pololu = require('../pololu.js');
var net = require('net');
var expect  = require('chai').expect

describe('pololu', function() {

  var id = "123456789abcdef";
  var port = 22446;
  var host = '127.0.0.1';

  var server;

  before(function(done) {
    server = net.createServer().listen(port,done);
  })

  after(function() {
    server.close()
  })

  var expect_data_to_equal_object = function(data, object){
    expect(JSON.parse(data)).to.be.deep.equal(object)
  }

  var check_result = function(expected, callback){
    server.once("connection", function(sock){
      sock.once("data", function(data) {
        expect_data_to_equal_object(data, expected)
        if (typeof callback !== 'undefined') {callback()}
      })
    })
  }

  it('should create a new pololu object', function(done) {
    var pololu = Pololu.create(id, port, host);
    expect(pololu).not.to.be.null;
    done();
  })

  describe('Sending speed', function() {
    it('should send positive speed', function(done) {
      var pololu = Pololu.create(id, port, host);
      var speed = 75;
      pololu.drive(speed);

      check_result({id: id, speed: speed}, done);

    })

    it('should send negative speed', function(done) {
      var pololu = Pololu.create(id, port, host);
      var speed = -25;
      pololu.drive(speed);

      check_result({id: id, speed: speed}, done);
    })
  })

  it('should send turnspeed', function(done) {
    var pololu = Pololu.create(id, port, host);
    var turnspeed = 50;
    pololu.turn(turnspeed);

    check_result({id: id, turnspeed: turnspeed}, done);
  })

  it('should send stop', function(done) {
    var pololu = Pololu.create(id, port, host);
    pololu.stop();

    check_result({id: id, stop: true}, done);
  })

  it('should send calibrate', function(done) {
    var pololu = Pololu.create(id, port, host);
    pololu.calibrate();

    check_result({id: id, calibrate: true}, done);
  })

  it('should get linesensor', function(done) {
    var pololu = Pololu.create(id, port, host);
    var value = 25;

    var temp = pololu.get_line_sensor(function(sensor_value){
      expect(sensor_value).to.be.equal(value)
      done();
    });

    server.once("connection", function(sock){
      sock.once("data", function(data) {
        expect_data_to_equal_object(data, {id: id, get: 'linesensor'})
        sock.write(JSON.stringify({id: id, linesensor: value}))
      })
    })
  })


});
