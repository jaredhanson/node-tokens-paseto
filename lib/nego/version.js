module.exports = function negotiateVersion(options, local) {
  console.log('NEGOTIATE VERSION!');
  console.log(options)
  
  var remote = options.versions;
  if (!remote) {
    // optimistic
    return 'v2';
  }
  
  return remote[0];
  
  
  return 'v2';
  
}
