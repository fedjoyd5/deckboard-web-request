const { dialog } = require('electron');
const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
const https = require('https');

class WebRequestExtension extends Extension {
	constructor() {
		super();
		this.name = 'Web Request';
		this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
		this.inputs = [
			{
				label: 'GET WebRequest',
				value: 'GET-WebRequest',
				icon: 'power-off',
				color: '#34495e',
				input: [
					{
						type: INPUT_METHOD.INPUT_TEXT
						label: 'URL',
						ref: 'URL',
					}
				]
			}
		];
	}

	execute(action, { URL }) {
		//log.info(`${action} ${powerAction}`);
		switch (action) {
			case 'GET-WebRequest': {
				https.get(( URL.startswith("https://") ? URL : ("https://" + URL)), (resp) => {
					resp.on('end', () => {
						log.info("request ended");
					});
				}).on("error", (err) => { log.info("Error: " + err.message); });

			}
			default:
				break;
		}
	}
}

module.exports = new WebRequestExtension();
