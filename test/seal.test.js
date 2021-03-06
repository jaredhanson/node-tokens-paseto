/* global describe, it */

var Paseto = require('paseto.js');
var setup = require('../lib/seal');
var sinon = require('sinon');
var expect = require('chai').expect;


describe('seal', function() {
  
  describe('defaults', function() {
    
    describe('encrypting to recipient using defaults', function() {
      var token;
      
      var keying = sinon.stub().yields(null, { secret: '12abcdef7890abcdef7890abcdef7890' });
      
      before(function(done) {
        var seal = setup(keying);
        seal({ foo: 'bar' }, { identifier: 'https://self-issued.me' }, function(err, t) {
          token = t;
          done(err);
        });
      });
      
      it('should generate a token', function() {
        expect(token.length).to.be.above(0);
        expect(token.substr(0, 9)).to.equal('v2.local.');
      });
      
    }); // encrypting to recipient using defaults
    
    describe('encrypting to recipient, negotiating v1', function() {
      var token;
      
      var keying = sinon.stub().yields(null, { secret: '12abcdef7890abcdef7890abcdef7890' });
      
      before(function(done) {
        var recipient = {
          id: 'https://api.example.com/'
        };
        var options = {
          versions: [ 'v1' ]
        }
        
        var seal = setup(keying);
        seal({ foo: 'bar' }, recipient, options, function(err, t) {
          token = t;
          done(err);
        });
      });
      
      it('should generate a token', function() {
        expect(token.length).to.be.above(0);
        expect(token.substr(0, 9)).to.equal('v1.local.');
      });
      
    }); // encrypting to recipient, negotiating v1
    
  });
  
});
