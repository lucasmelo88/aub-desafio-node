(function () {

	'use strict';

	var tmp = require('tmp'),
	util = require('util');

	tmp.setGracefulCleanup();

	/**
	 * Método utilizado em page objects para tornar selectors dinâmicos, podendo
	 * fazer interpolações.
	 */
	exports.el = function (elementName, data) {
		var element = this.elements[elementName.slice(1)];
		var args = [element.selector];
		var dataArgs = Array.prototype.slice.call(arguments, 1);
		if (dataArgs.length) {
			args = args.concat(dataArgs);
		}
		return util.format.apply(this, args);
	};

})();