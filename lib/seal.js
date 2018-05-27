var paseto = require('paseto.js')
  , negotiateVersion = require('./negotiate/version')
  , v2 = require('./v2');


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
    
    
    // FIXME: query with correct algos
    var query  = {
      usage: 'deriveKey',
      algorithms: [ 'hkdf' ]
    }
    
    var v = negotiateVersion(options);
    
    console.log('NEGOTIATED VERSION!');
    console.log(v)
    
    switch (v) {
    case 'v2':
      console.log('CALL V2 SEAL!');
      return v2.seal(claims, recipients[0], options, keying, cb);
    }
    
   
    
    return
    
    keying(recipients[0], query, function(err, key) {
      /*
      var v1 = new paseto.V1();
      var pk = new paseto.SymmetricKey.V1(key.secret);
      var payload = JSON.stringify(claims);
      v1.encrypt(payload, pk, '', function(err, token) {
        if (err) { return cb(err); }
        return cb(null, token);
      });
      */
      
      
      var v2 = new paseto.V2();
      var pk = new paseto.SymmetricKey.V2(key.secret);
      var payload = JSON.stringify(claims);
      v2.encrypt(payload, pk, '', function(err, token) {
        console.log(err)
        console.log(token);
        
        if (err) { return cb(err); }
        return cb(null, token);
      });
      
    });
  };
};
