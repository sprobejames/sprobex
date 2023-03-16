function CUSTOM_EXCEPTION (message = 'Model Not Found.') {
  this.name = 'CUSTOM_EXCEPTION';
  this.message = message;
  var error = new Error(this.message);
  error.name = this.name;
  this.stack = error.stack;
}

CUSTOM_EXCEPTION.prototype = Object.create(Error.prototype);

module.exports = CUSTOM_EXCEPTION;
