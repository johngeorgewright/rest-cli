var should = require('chai').should(),
    sinon  = require('sinon'),
    util   = require('util'),
    Crud   = require('../lib/client/Crud');

describe('client.Crud', function(){

  var client, blog;

  beforeEach(function(){
    client = new Crud({
      baseURL: 'http://localhost'
    });

    blog = {
      title: 'test blog',
      content: 'test content'
    };
  });

  describe('path()', function(){

    it('will throw an error when passed an invalid action', function(){
      var err = function(){
        client.path('invalid action');
      };
      err.should.Throw('Invalid action "invalid action"');
    });

    it('will return a path when passing just an action', function(){
      var path;
      client.defaults.retrieveAll = '/blogs';
      path = client.path('retrieveAll');
      path.should.equal('/blogs');
    });

    it('wil replace any {keys} with values when passed a key/value object as a 2nd parameter', function(){
      var path;
      client.defaults.retrieveOne = '/blog/{id}';
      path = client.path('retrieveOne', {id: 1});
      path.should.to.equal('/blog/1');
    });

  });

  describe('create()', function(){
    
    it('will call the #post() method', function(){
      var path = client.path('create'),
          data = {title: 'mung'};

      sinon.spy(client, 'post');
      client.create(data);
      client
        .post.calledWithExactly(path, {data: data})
        .should.be.true;
    });

  });

  describe('retrieve()', function(){

    it('will call #get() with the retrieveAll action when no arguments are passed', function(){
      var path = client.path('retrieveAll');
      sinon.spy(client, 'get');
      client.retrieve();
      client
        .get.calledWithExactly(path)
        .should.be.true;
    });

    it('will call #get() with the retrieveOne action when an argument is passed', function(){
      var path = client.path('retrieveOne', {id: 1});
      sinon.spy(client, 'get');
      client.retrieve(1);
      client
        .get.calledWithExactly(path)
        .should.be.true;
    });

  });

  describe('update()', function(){
    
    it('will call the #put() method', function(){
      var path = client.path('update', {id: 1}),
          data = {content: 'content'};

      sinon.spy(client, 'put');
      client.update(1, data);
      client
        .put.calledWithExactly(path, {data: data})
        .should.be.true;
    });

  });

  describe('destroy()', function(){
    
    it('will call the #del() method', function(){
      var path = client.path('destroy', {id: 1});
      sinon.spy(client, 'del');
      client.destroy(1);
      client
        .del.calledWithExactly(path)
        .should.be.true;
    });

  });

});

