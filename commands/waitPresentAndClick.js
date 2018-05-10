'use strict';

exports.command = function(selector) {
  return this.waitAndClick(this.waitForElementPresent, selector);
};
