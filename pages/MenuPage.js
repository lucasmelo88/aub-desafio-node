module.exports = {
	elements: {
		menuOpportunities: {
			selector: '//a[text()=\"Opportunities\"]',
			locateStrategy: 'xpath'
		}
	},
	commands: [{
		clickOnOpportunitiesOption: function () {
			return this.click('@menuOpportunities');
		}
	}]
}