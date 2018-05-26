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
    
    
    // FIXME: query with correct algos
    var query  = {
      usage: 'deriveKey',
      algorithms: [ 'pbkdf2' ]
    }
    
    keying(recipients[0], query, function(err, key) {
      var v1 = new paseto.V1();
      var pk = new paseto.SymmetricKey.V1(key.secret);
      var payload = JSON.stringify(claims);
      v1.encrypt(payload, pk, '', function(err, token) {
        if (err) { return cb(err); }
        return cb(null, token);
      });
    });
  };
};
