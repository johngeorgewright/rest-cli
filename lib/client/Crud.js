var Base = require('./Base'),
    util = require('util');

RegExp.quote = require('regexp-quote');

function Crud(options){
  var defaults = {
    create      : '/blog',
    retrieveAll : '/blogs',
    retrieveOne : '/blog/{id}',
    update      : '/blog/{id}',
    destroy     : '/blog/{id}'
  };

  util._extend(defaults, options);

  Base.call(this, defaults);
}

util.inherits(Crud, Base);

Crud.prototype.path = function(action, data){
  var key, path, reg;

  if(data === undefined){
    data = {};
  }

  if(!this.defaults.hasOwnProperty(action)){
    throw new Error('Invalid action "' + action + '"');
  }

  path = this.defaults[action];

  for(key in data){
    if(data.hasOwnProperty(key)){
      reg  = new RegExp(RegExp.quote('{'+key+'}'), 'g');
      path = path.replace(reg, data[key]);
    }
  }

  return path;
};

Crud.prototype.create = function(data){
  return this.post(this.defaults.create, { data: data });
};

Crud.prototype.retrieve = function(id){
  var path = id === undefined ? this.path('retrieveAll') : this.path('retrieveOne', {id: id});
  return this.get(path);
};

Crud.prototype.update = function(id, data){
  return this.put(this.path('update', {id: id}), { data: data });
};

Crud.prototype.destroy = function(id){
  return this.del(this.path('destroy', {id: id}));
};

module.exports = Crud;
 
