var main,
	menu,
	spontaneousCandidate;

module.exports = {
	beforeEach: function (client) {
		var aubaySiteUrl = client.globals.aubay_url;
		main = client.page.MainPage(),
			menu = client.page.MenuPage(),
			spontaneousCandidate = client.page.SpontaneousCandidatePage();
		main
			.navigate()
			.waitPageLoad()
			.api.maximizeWindow();
		console.log('before')
	},

	afterEach: function (client, done) {
		client.end(function () {
			console.log('after');
			done();
		});
	},

	'Fill all fields to Spontaneous candidate and submit form': function (client) {

		menu.clickOnOpportunitiesOption();
		main.waitForSpontaneousContactButtonAndClick()
		spontaneousCandidate
			.fillName('João')
			.fillPhoneNumber('Brazil', '12345678')
			.fillEmail('joao@desafio.com.br')
			.selectProfessionalLevel('Junior')
			.fillTechnologies('Javascript')
			.fillLinkedin('https://www.linkedin.com/help/linkedin')
			.submitClick();
	},
	'Do not fill name field to Spontaneous candidate and submit form': function (client) {
		menu.clickOnOpportunitiesOption();
		main.waitForSpontaneousContactButtonAndClick()
		spontaneousCandidate
			.fillPhoneNumber('Brazil', '12345678')
			.fillEmail('joao@desafio.com.br')
			.selectProfessionalLevel('Junior')
			.fillTechnologies('Javascript')
			.fillLinkedin('https://www.linkedin.com/help/linkedin')
			.submitClick();
		main.verifyAlertMessage('Required fields: Name !')
	},
	'Do not fill phone number field to Spontaneous candidate and submit form': function (client) {
		menu.clickOnOpportunitiesOption();
		main.waitForSpontaneousContactButtonAndClick()
		spontaneousCandidate
			.fillName('João')
			.fillEmail('joao@desafio.com.br')
			.selectProfessionalLevel('Junior')
			.fillTechnologies('Javascript')
			.fillLinkedin('https://www.linkedin.com/help/linkedin')
			.submitClick();
		main.verifyAlertMessage('Required fields: Mobile !')
	},
	'Do not fill email field to Spontaneous candidate and submit form': function (client) {
		menu.clickOnOpportunitiesOption();
		main.waitForSpontaneousContactButtonAndClick()
		spontaneousCandidate
			.fillName('João')
			.fillPhoneNumber('Brazil', '12345678')
			.selectProfessionalLevel('Junior')
			.fillTechnologies('Javascript')
			.fillLinkedin('https://www.linkedin.com/help/linkedin')
			.submitClick();
		main.verifyAlertMessage('Required fields: Email !')
	},
	'Do not fill technologies field to Spontaneous candidate and submit form': function (client) {
		menu.clickOnOpportunitiesOption();
		main.waitForSpontaneousContactButtonAndClick()
		spontaneousCandidate
			.fillName('João')
			.fillPhoneNumber('Brazil', '12345678')
			.fillEmail('joao@desafio.com.br')
			.selectProfessionalLevel('Junior')
			.fillLinkedin('https://www.linkedin.com/help/linkedin')
			.submitClick();
		main.verifyAlertMessage('Required fields: Technologies !')
	},
	'Do not fill linkedin field to Spontaneous candidate and submit form': function (client) {
		menu.clickOnOpportunitiesOption();
		main.waitForSpontaneousContactButtonAndClick()
		spontaneousCandidate
			.fillName('João')
			.fillPhoneNumber('Brazil', '12345678')
			.fillEmail('joao@desafio.com.br')
			.selectProfessionalLevel('Junior')
			.fillTechnologies('Javascript')
			.submitClick();
		main.verifyAlertNotPresent();
	}
};