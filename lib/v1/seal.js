var paseto = require('paseto.js');


module.exports = function paseto_v1_encrypt(claims, recipient, options, keying, cb) {
    
  // FIXME: query with correct algos
  var query  = {
    usage: 'deriveKey',
    algorithms: [ 'hkdf' ]
  }
  
  keying(recipient, query, function(err, key) {
    var v1 = new paseto.V1();
    var pk = new paseto.SymmetricKey.V1(key.secret);
    var payload = JSON.stringify(claims);
    v1.encrypt(payload, pk, '', function(err, token) {
      if (err) { return cb(err); }
      return cb(null, token);
    });
  });
};
