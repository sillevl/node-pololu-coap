var Pololu  = require('../pololu.js'),
    coap    = require('coap'),
    expect  = require('chai').expect

describe('Pololu CoAP', function() {

  var id = "123456789abcdef";

  var server;
  var pololu;

  before(function(done) {
    server = coap.createServer().listen(done);
    pololu = Pololu.create(id);
  })

  after(function() {
    server.close()
  })

  var expect_data_to_equal_object = function(data, object){
    expect(JSON.parse(data)).to.be.deep.equal(object)
  }

  var check_result = function(expected, callback){
    server.once('request', function(req, res) {
        expect_data_to_equal_object(req.payload, expected)
        if (typeof callback !== 'undefined') {callback()}
    })
  }

  it('should create a new pololu object', function(done) {
    expect(pololu).not.to.be.null;
    done();
  })

  describe('Sending speed', function() {
    it('should send positive speed', function(done) {
      var speed = 75;
      pololu.drive(speed);
      check_result({id: id, speed: speed}, done);

    })

    it('should send negative speed', function(done) {
      var speed = -25;
      pololu.drive(speed);

      check_result({id: id, speed: speed}, done);
    })
  })

  it('should send turnspeed', function(done) {
    var turnspeed = 50;
    pololu.turn(turnspeed);

    check_result({id: id, turnspeed: turnspeed}, done);
  })

  it('should send stop', function(done) {
    pololu.stop();

    check_result({id: id, stop: true}, done);
  })

  it('should send calibrate', function(done) {
    pololu.calibrate();

    check_result({id: id, calibrate: true}, done);
  })

  it('should get linesensor', function(done) {
    var value = 25;

    pololu.get_line_sensor(function(sensor_value){
      console.log("sensor_value: " + sensor_value)
      expect(sensor_value).to.be.equal(value)
      done();
    });

    server.once('request', function(req, res) {
        expect_data_to_equal_object(req.payload, {id: id})
        expect(req.method).to.be.equal('GET')
        res.end(JSON.stringify({id: id, linesensor: value}))
    })
  })


});
