
define('moduleB', ['moduleA'], function(moduleA) {
  return moduleA + 'this is moduleB'
})