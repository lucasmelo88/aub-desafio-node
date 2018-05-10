'use strict';

exports.command = function(command, selector) {
  var self = this,
    timeout = self.globals.default_timeout;

  command(selector, timeout)
    .click(selector);

  return self;
};
