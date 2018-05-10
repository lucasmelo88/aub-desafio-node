(function() {
    'use strict';
  
    module.exports = {
      DEBUG_MODE : (process.env.NODE_ENV || 'test') === 'debug'
    };
  
  })();
  