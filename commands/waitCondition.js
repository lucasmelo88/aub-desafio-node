
var DEBUG_MODE = require('../lib/config').DEBUG_MODE;

/**
 * This custom command allows us to execute some predicate inside the page
 * and wait until it returns true.
 * It retries executing the predicate function until either its state evaluates to SUCCESS
 * or it reaches maxTimeInMilliseconds, which FAILS the test if not silent.
 */
function WaitCondition() {
  this.startTimeInMilliseconds = null;
  this.retryDelay = 500;
}

WaitCondition.prototype.command = function(predicate, parameters, timeoutInMilliseconds, silent, done, failWithAssert) {
  var self = this,
    predicateName = predicate.name || 'anonymous';

  this.startTimeInMilliseconds = new Date().getTime();
  silent = silent || false;
  parameters = parameters || [];
  parameters.push(null);

  if (typeof timeoutInMilliseconds !== 'number') {
    timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
  }

  this.api.perform(function(client, donePerform) {
    self.check(predicate, predicateName, parameters, function(result, loadedTimeInMilliseconds) {
      result.execTime = loadedTimeInMilliseconds - self.startTimeInMilliseconds;
      donePerform();

      if (result.state === 'SUCCESS') {
        if (! silent) {
          console.log(' \033[0;32m' + String.fromCharCode(10004) +
            '\033[0m Predicate ' + predicateName + ' succeeded after ' +
            result.execTime + 'ms');
        }
      } else if (! silent) {
        (failWithAssert ? client.assert : client.verify).ok(false,
          'Status ' + result.state + ' returned when waiting for predicate ' +
          predicateName + '(' + JSON.stringify(parameters) + ')');
      }

      if (DEBUG_MODE) {
        console.log('Status ' + result.state + ' returned when waiting for predicate ' +
          predicateName + '(' + JSON.stringify(parameters) + ')');
      }

      if (done) {
        done(result);
      }
    }, timeoutInMilliseconds);
  });

  return this;
};

WaitCondition.prototype.check = function(predicate, predicateName, parameters, callback, maxTimeInMilliseconds) {
  var self = this;
  var onPerformDone = function(result) {
    var now = new Date().getTime();

    if (result) {
      if (DEBUG_MODE) {
        if (result && result.debug) {
          console.log('[WaitCondition ' + predicateName +
            '] Predicate is ' + JSON.stringify(result));
        }
      }
      if (result.state === 'SUCCESS') {
        callback(result, now);
      } else if (result.state === 'FAIL') {
        // failed
        callback(result, now);
      } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
        parameters.pop();
        parameters.push(result);
        // waiting to complete
        setTimeout(function() {
          self.check(predicate, predicateName, parameters, callback, maxTimeInMilliseconds);
        }, self.retryDelay);
      } else {
        // timed out
        if (DEBUG_MODE) {
          console.log('[WaitCondition ' + predicateName + '] TIMED OUT');
        }
        result.state = 'TIMEOUT';
        result.error = 'The command timed out.';
        callback(result, now);
      }
    } else {
      // could not run the function at the client because of some javascript error
      // or other reason.
      if (DEBUG_MODE) {
        console.log('[WaitCondition ' + predicateName +
          '] Failed, Result is ' + JSON.stringify(result));
      }
      callback({
        state: 'FAIL',
        error: result.message
      }, now);
    }
  };

  this.api.perform(function(client, done) {
      var result = predicate.apply(this, [client, function(result) {
        done();
        onPerformDone(result);
      }, ...parameters]);
    });
};

module.exports = WaitCondition;
