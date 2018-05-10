"use strict";

var baseUrl = process.env.AUBAY_SITE_URL || "http://www.aubay.pt/";

module.exports = {
	asyncHookTimeout: 60000,
	//reporter: reporter.fn,
	waitForConditionTimeout: 60000,

	"default": {
		"aubay_url": baseUrl,
		"default_timeout": 60000
	},
	"firefox": {
		"aubay_url": baseUrl,
		"default_timeout": 60000
	},
	"images_path": "images/",
	App: {
		NAME: 'Aubay',
		TITLE: 'Aubay'
	}
};