var paseto = require('paseto.js')
  , negotiateVersion = require('./nego/version')
  , v1 = require('./v1')
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
    options = options || {};
    
    
    // FIXME: query with correct algos
    var query  = {
      usage: 'deriveKey',
      algorithms: [ 'hkdf' ]
    }
    
    var v;
    try {
      v = negotiateVersion(options);
    } catch (ex) {
      return cb(ex);
    }
    
    switch (v) {
    case 'v1':
      return v1.seal(claims, recipients[0], options, keying, cb);
    case 'v2':
      return v2.seal(claims, recipients[0], options, keying, cb);
    default:
      return cb(new Error('Unsupported PASETO protocol version: ' + v));
    }
  };
};
