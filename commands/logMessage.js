'use strict';

var config = require('../lib/config');

exports.DEBUG_LEVEL = 'debug';

exports.command = function(msg, level) {

  this.perform(function(client, done) {
    var print = true;

    if (level && level === 'debug') {
      if (!config.DEBUG_MODE) {
        print = false;
      }
    }

    if (print) {
      console.log(msg);
    }

    done();
  });

  return this;
};
