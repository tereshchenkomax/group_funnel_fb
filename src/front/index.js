"use strict";

(function () {
	//document.body.dataset.new_full_url = chrome.extension.getURL('salestools.html#' + document.location);
	var activeHash;

	function run(url) {
      parse(url);
	};

	function parse(url) {
		var parser = new Parser();
		var data = parser.runParse(url, document);

		data.then(data => {
      console.log('data.length', data.length);
      chrome.runtime.sendMessage({ "message": "SEND_DATA", data })
    });
	}

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.message === "run") {
			run(request.url);
		}
		if (request.message === "target_tab") {
			activeHash = request.activeHash
		}
		if (request.message === "remove_hash") {
			activeHash = undefined;
		}
	});
}());
