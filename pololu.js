var coap = require('coap')

var Pololu = function(id, host, port){
  this.id = id;

  if (port == undefined) {
    port = 5683
  }

  if (host == undefined) {
    host = '127.0.0.1'
  }

  // setters
  this.drive = function(speed){
    set('speed', {speed: speed})
  }

  this.turn = function(turnspeed){
    set('turn', {turnspeed: turnspeed})
  }

  this.stop = function(){
    set('stop', {stop: true})
  }

  this.calibrate = function(){
    set('calibrate', {calibrate: true})
  }

  this.led = function(index, state){
    set('led', {led: index, state: state})
  }

  // getters
  this.get_line_sensor = function(callback){
    var request = get('linesensor')
    request.once('response', function(response){
      var line_sensor_value = JSON.parse(response.payload).linesensor
      callback(line_sensor_value)
    })
  }

  var set = function(pathname, data){
    data.id = id
    coap.request({ hostname: host, port: port, method: 'post', pathname: pathname })
    .end(JSON.stringify(data))
  }

  var get = function(pathname){
    return coap.request({ hostname: host, port: port, method: 'get', pathname: pathname })
    .end(JSON.stringify({id: id}))
  }

  this.close = function(){
    client.close()
  }
}

exports.create = function(id, host, port) {
  return new Pololu(id, host, port);
};
