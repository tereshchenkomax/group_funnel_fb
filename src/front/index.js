"use strict";

(function () {
	//document.body.dataset.new_full_url = chrome.extension.getURL('salestools.html#' + document.location);
	var activeHash;

	function run({url, params={}}) {
      parse(url, params);
	};

	function parse(url, params) {
		var parser = new Parser(params);
		var data = parser.runParse(url, document);

		data.then(data => chrome.runtime.sendMessage({ "message": "SEND_DATA", data }));
	}

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.message === "run") {
			run({url: request.url, params: request.params });
		}
		if (request.message === "target_tab") {
			activeHash = request.activeHash
		}
		if (request.message === "remove_hash") {
			activeHash = undefined;
		}
	});
}());
