
var DEBUG_MODE = require('../lib/config').DEBUG_MODE;

/**
 * This custom command allows us to execute some predicate inside the page
 * and wait until it returns true.
 * It retries executing the predicate function until either its state evaluates to SUCCESS
 * or it reaches maxTimeInMilliseconds, which FAILS the test if not silent.
 */
function WaitExecutePredicate() {}

WaitExecutePredicate.prototype.command = function(predicate, parameters,
  timeoutInMilliseconds, silent, done, isAssert) {
  var self = this;
  var fn = function(client, done2) {
    var predicateArgs = [].slice.call(arguments).slice(2);

    client.execute(predicate, predicateArgs, function(result) {
      if (result.status === - 1) {
        done2({
          state: 'FAIL',
          debug: 'Predicate returned status ' + result.status + ': ' +
            JSON.stringify(result)
        });
      } else {
        done2(result.value);
      }
    });
  };

  Object.defineProperty(fn, 'name', {value: predicate.name || 'anonymous'});
  self.api.waitCondition(fn, parameters, timeoutInMilliseconds, silent, done, isAssert);

  return self;
};

module.exports = WaitExecutePredicate;
