var testUtils = require('../lib/testUtils');
var util = require('util');

module.exports = {
	elements: {
		inputName: {
			selector: 'input[id=\"Name\"]'
		},
		phoneListSelect: {
			selector: '#TelemovelList'
		},
		regionListOption: {
			selector: '//option[contains(.,\"%s\")]'
		},
		inputPhoneNumber: {
			selector: '#Mobile'
		},
		inputEmail: {
			selector: '#Email'
		},
		professionalLevelSelect: {
			selector: '#NivelProfissionalId'
		},
		professionalLevelOption: {
			selector: "//option[contains(.,'%s')]"
		},
		inputTechologies: {
			selector: '.select2-search__field'
		},
		techOption: {
			selector: "//li[contains(.,'%s')]"
		},
		inputLinkedin: {
			selector: '#Linkedin'
		},
		submitButton: {
			selector: '#Save'
		}
	},
	commands: [{
		fillName: function (name) {
			var self = this;
			this
				.waitForElementPresent('@inputName', 10000, true, function () {
					self
						.click('@inputName')
						.setValue('@inputName', name)
				}, 'waiting for name input')
			return this;
		},
		fillPhoneNumber: function (region, number) {
			var self = this;
			this
				.waitForElementPresent('@phoneListSelect', 10000, true, function () {
					self
						.click('@phoneListSelect')
				}, 'waiting for phone list select')
				.api.useXpath()
				.click(this.el('@regionListOption', region));
			this
				.click('@phoneListSelect')
				.waitForElementPresent('@inputPhoneNumber', 5000, true, function () {
					self.setValue('@inputPhoneNumber', number)
				}, 'waiting for load phone number input')
			return this;
		},
		fillEmail: function (email) {
			return this.setValue('@inputEmail', email)
		},
		selectProfessionalLevel: function (professionalLevel) {
			var self = this;
			this
				.waitForElementPresent('@professionalLevelSelect', 10000, true, function () {
					self
						.click('@professionalLevelSelect')
				}, 'waiting for professional level select')
				.api.useXpath()
				.waitPresentAndClick(this.el('@professionalLevelOption', professionalLevel))
			return this;
		},
		//TODO implement this method to receive an array of technologies
		fillTechnologies: function (techInfo) {
			this
				.waitPresentAndClick('@inputTechologies')
				.setValue('@inputTechologies', techInfo)
				.api.useXpath()
				.waitPresentAndClick(this.el('@techOption', techInfo))
			return this;
		},
		fillLinkedin: function (linkedinUrl) {
			this
				.waitPresentAndClick('@inputLinkedin')
				.setValue('@inputLinkedin', linkedinUrl)
			return this;
		},
		submitClick: function () {
			return this.click('@submitButton');
		},
		el: testUtils.el
	}]
}