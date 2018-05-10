module.exports = {
	url: 'http://www.aubay.pt/',
	elements: {
		welcomeMessage: {
			selector: '//h3[text()=\"WELCOME TO AUBAY\"]',
			locateStrategy: 'xpath'
		},
		spontaneousContactButton: {
			selector: '//a[text()=\"Spontaneous Contact\"]',
			locateStrategy: 'xpath'
		},
		alertMessage: {
			selector: '.toast-message'
		}
	},
	commands: [{
		waitPageLoad: function () {
			return this.waitForElementVisible('@welcomeMessage', 10000, true, null, 'Waiting for page load');
		},
		waitForSpontaneousContactButtonAndClick: function () {
			return this
				.waitForElementVisible('@spontaneousContactButton', 10000, true, null, 'Waiting for spontaneous contact button')
				.click('@spontaneousContactButton');
		},
		verifyAlertMessage: function (message) {
			var self = this;
			this
				.waitForElementVisible('@alertMessage', 5000, true, null, 'Waiting for alert message')
				.getText('@alertMessage', function (msg) {
					self.verify.equal(msg.value, message, "messages should be equal");
				});
			return this;
		},
		verifyAlertNotPresent: function () {
			this.verify.elementNotPresent('@alertMessage')
		}
	}]
}