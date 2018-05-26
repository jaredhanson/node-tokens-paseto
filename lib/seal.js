var paseto = require('paseto.js');


module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
  options = options || {};
  
  
  return function paseto_seal(claims, recipients, options, cb) {
    if (!Array.isArray(recipients)) {
      recipients = [ recipients ];
    }
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    
    console.log('PASETO SEAL!');
    console.log(claims)
    
    var v1 = new paseto.V1();
    //console.log(v1)
    
    var k = '1'
    
    var key = new paseto.SymmetricKey.V1(k);
    //console.log(key);
    
    // FIXME: query with correct algos
    var query  = {
      usage: 'deriveKey',
      algorithms: [ 'pbkdf2' ]
    }
    
    keying(recipients[0], query, function(err, key) {
      console.log('KEYED!');
      console.log(err);
      console.log(key)
      
      
      var pk = new paseto.SymmetricKey.V1(key.secret);
      var payload = JSON.stringify(claims);
      v1.encrypt(payload, pk, '', function(err, token) {
        if (err) { return cb(err); }
        return cb(null, token);
      });
    });
  };
};
