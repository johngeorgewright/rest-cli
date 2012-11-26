var rest = require('restler');

function Blog(defaults){
  rest.Service.call(this, defaults);
}

Blog.prototype.create = function(data){
  this.post(this.defaults.create, { data: data });
};

Blog.prototype.retrive = function(){
  this.post(this.defaults.retrieve);
};

Blog.prototype.update = function(id, data){
  this.post(this.defaults.update.replace('{id}', id), { data: data });
};

Blog.prototype.destroy = function(id){
  this.del(this.defaults.destory.replace('{id}', id));
};

module.exports = rest.service(Blog, {
  create   : '/blog',
  retrieve : '/blogs',
  update   : '/blog/{id}',
  destory  : '/blog/{id}'
});

