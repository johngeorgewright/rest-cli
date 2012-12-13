var Base = require('./Base'),
    util = require('util');

function Crud(options){
  var defaults = {
    create   : '/blog',
    retrieve : '/blogs',
    update   : '/blog/{id}',
    destory  : '/blog/{id}'
  };

  util._extend(defaults, options);

  Base.call(this, defaults);
}

util.inherits(Crud, Base);

Crud.prototype.create = function(data){
  return this.post(this.defaults.create, { data: data });
};

Crud.prototype.retrieve = function(){
  return this.post(this.defaults.retrieve);
};

Crud.prototype.update = function(id, data){
  return this.post(this.defaults.update.replace('{id}', id), { data: data });
};

Crud.prototype.destroy = function(id){
  return this.del(this.defaults.destory.replace('{id}', id));
};

module.exports = Crud;
 
