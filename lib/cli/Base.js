function bind(fn, context){
  context = context || this;
  return function(){
    return fn.apply(context, arguments);
  };
}

function Base(client){
  this.commander = require('commander');
  this.client    = client || require('restler');
  this.setup();
}

Base.prototype.__super__ = function(method){
  var args = Array.prototype.slice.call(arguments, 1),
      sup  = this.constructor.super_,
      val;

  if(!sup){
    throw new Error('Method ' + (typeof this.constructor) + '#' + method + '() does not exist');
  }

  // Set the super class as the super's super. This way
  // the super can reference it's own super if required
  // to do so.
  this.constructor.super_ = sup.constructor.super_;

  // Call the super method
  val = sup[method].apply(this, args);

  // Reset the correct super.
  this.constructor.super_ = sup;

  return val;
};

Base.prototype.command = function(name, desc, fn){
  if(typeof fn === 'undefined'){
    fn = name;
  }

  return this
    .commander
    .command(name)
    .description(desc)
    .action(typeof fn === 'string' ? bind(this[fn], this) : fn);
};

Base.prototype.option = function(){
  return this.commander.option.apply(this.commander, arguments);
};

Base.prototype.setVersion = function(version){
  this.version = version;
  this.commander.version(version);
};

Base.prototype.setup = function(){
  this.setVersion(this.version || '0.0.0');
};

Base.prototype.run = function(){
  this.commander.parse(process.argv);
};

module.exports = Base;

