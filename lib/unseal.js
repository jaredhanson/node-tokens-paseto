module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
  options = options || {};
  
  
  return function paseto_unseal(sealed, parameters, cb) {
  };
};
