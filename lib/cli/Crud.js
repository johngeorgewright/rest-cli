var Base    = require('./Base'),
    clients = require('../client'),
    util    = require('util'),
    assert  = require('assert');

function error(err){
  console.error('ERROR: %s', err.message);
}

function Crud(defaults){
  Base.call(this, new clients.Crud(defaults));
}

util.inherits(Crud, Base);

Crud.prototype.create = function(data){
  this
    .client
    .create(data)
    .on('error', error);
};

Crud.prototype.retrieve = function(){
  this
    .client
    .retrieve()
    .on('error', error)
    .on('success', function(blogs){
      blogs.forEach(function(blog){
        console.log("%s\t%s", blog.id, blog.title);
      });
    });
};

Crud.prototype.update = function(command){
  this
    .client
    .update(command.id, command.data)
    .on('error', error);
};

Crud.prototype.destroy = function(command){
  this
    .client
    .destroy(command.id)
    .on('error', error);
};

Crud.prototype.addPostCommand = function(){
  this.command('post', 'Creates a new blog post', 'create');
};

Crud.prototype.addListCommand = function(){
  this.command('list', 'Lists all records', 'retrieve');
};

Crud.prototype.addUpdateCommand = function(){
  this
    .command('update', 'Updates a record')
    .option('-i, --id <id>', 'The record ID');
};

Crud.prototype.addDestroyCommand = function(){
  this
    .command('destroy', 'Destorys a record')
    .option('-i, --id <id>', 'The record ID');
};

Crud.prototype.setup = function(){
  Base.prototype.setup.call(this);
  this.addPostCommand();
  this.addListCommand();
  this.addUpdateCommand();
  this.addDestroyCommand();
};

module.exports = Crud;

