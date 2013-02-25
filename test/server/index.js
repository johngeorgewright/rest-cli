var restify      = require('restify'),
    server       = restify.createServer(),
    configurable = require('configurable'),
    util         = require('util'),
    data         = {};

function dataLength(){
  var size = 0,
      key;
  for(key in data){
    if(data.hasOwnProperty(key)) size++;
  }
  return size;
}

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));
server.pre(restify.pre.userAgentConnection());

server.get('/blogs', function(req, res, next){
  res.send(data);
  next();
});

server.get('/blog/:id', function(req, res, next){
  var blog = data[req.params.id];
  if(blog){
    res.send(data[req.params.id]);
  }
  else{
    res.send(404);
  }
  next();
});

server.post('/blog', function(req, res, next){
  var id  = dataLength() + 1,
      obj = util._extend({id: id}, req.body);

  data[id] = obj;
  res.send(obj);
  next();
});

server.put('/blog/:id', function(req, res, next){
  data[req.params.id] = req.body;
  res.send(200);
  next();
});

server.del('/blog/:id', function(req, res, next){
  delete data[req.params.id];
  res.send(204);
  next();
});

server.settings = {
  port     : 8899,
  hostname : 'http://localhost'
};

server.settings.host = server.settings.hostname + ':' + server.settings.port;

server.start = function(callback){
  if(callback === undefined) callback = function(){};
  server.listen(server.settings.port, callback);
};

module.exports = server;

