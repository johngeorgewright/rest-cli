var Base = require('./Base'),
    util = require('util');

function Crud(options){
  var defaults = {
    create      : '/blog',
    retrieveAll : '/blogs',
    retrieveOne : '/blog/{id}',
    update      : '/blog/{id}',
    destory     : '/blog/{id}'
  };

  util._extend(defaults, options);

  Base.call(this, defaults);
}

util.inherits(Crud, Base);

Crud.prototype.create = function(data){
  return this.post(this.defaults.create, { data: data });
};

Crud.prototype.retrieve = function(id){
  var path = id === undefined ? this.defaults.retrieveAll : this.defaults.retrieveOne.replace('{id}', id);
  return this.get(path);
};

Crud.prototype.update = function(id, data){
  return this.put(this.defaults.update.replace('{id}', id), { data: data });
};

Crud.prototype.destroy = function(id){
  return this.del(this.defaults.destory.replace('{id}', id));
};

module.exports = Crud;
 
