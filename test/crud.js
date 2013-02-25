var expect = require('chai').expect,
    async  = require('async'),
    util   = require('util'),
    Crud   = require('../lib/client/Crud'),
    server = require('./server');

describe('client.Crud', function(){

  var client, blog;

  beforeEach(function(done){
    client = new Crud({
      baseURL: server.settings.host
    });

    blog = {
      title: 'test blog',
      content: 'test content'
    };

    server.start(done);
  });

  describe('create()', function(){

    it('will POST a record', function(done){
      client.create(blog).on('complete', function(result){
        expect(result).not.to.be.an('Error');
        expect(result).to.deep.equal(util._extend(blog, {id: 1}));
        done();
      });
    });

  });

  describe('retrieve()', function(){

    it('can get one item', function(done){
      client.retrieve(1).on('complete', function(result){
        expect(result).not.to.be.an('Error');
        expect(result).to.deep.equal(util._extend(blog, {id: 1}));
        done();
      });
    });

    it('can retrieve all items', function(done){
      client.retrieve().on('complete', function(result){
        expect(result).not.to.be.an('Error');
        expect(result).to.deep.equal({
          1: util._extend(blog, {id: 1})
        });
        done();
      });
    });

  });

  describe('update()', function(){

    it('it will update a record successfully', function(done){
      async.series([

        function(next){
          client.update(1, {title: 'new title'}).on('complete', function(result){
            expect(result).not.to.be.an('Error');
            next();
          });
        },

        function(next){
          client.retrieve(1).on('complete', function(result){
            expect(result.title).to.equal('new title');
            next();
          });
        }

      ], function(err){
        expect(err).not.to.exist;
        done();
      });
    });

  });

  describe('destroy()', function(){

    it('it will delete a record', function(done){
      async.series([

        function(next){
          client.destroy(1).on('complete', function(result, response){
            expect(response.statusCode).to.equal(204);
            next();
          });
        },

        function(next){
          client.get(1).on('complete', function(result, response){
            expect(response.statusCode).to.equal(404);
            next();
          });
        }

      ], function(err){
        expect(err).not.to.exist;
        done();
      });
    });

  });

  afterEach(function(){
    server.close();
  });

});

