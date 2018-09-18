"use strict";

(function () {
	//document.body.dataset.new_full_url = chrome.extension.getURL('salestools.html#' + document.location);
	var activeHash;

	function run({url, params={}}) {
      parse(url, params);
	};

  function run_n_upload({url, params={}}) {
      parse(url, params, 'ACTION::SEND_DATA:BACKGROUND');
  };

	function parse(url, params, message='SEND_DATA') {
		var parser = new Parser(params);
		var data = parser.runParse(url, document);
		data.then(data => chrome.runtime.sendMessage({ message, data }));
	}

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.message === "run") {
			run({url: request.url, params: request.params });
		}
    if (request.message === "run:upload") {
      run_n_upload({url: request.url, params: request.params });
    }
		if (request.message === "target_tab") {
			activeHash = request.activeHash
		}
		if (request.message === "remove_hash") {
			activeHash = undefined;
		}
	});
}());
