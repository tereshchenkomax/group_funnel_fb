"use strict";

(function () {
	var activeHash;
  var isProcess = false;

	function run({url, params={}}) {
      parse(url, params);
	};

  function run_n_upload({url, params={}}) {
      parse(url, params, 'ACTION::SEND_DATA:BACKGROUND');
  };

	function parse(url, params, message='SEND_DATA') {
		var parser = new Parser(params);
		const parsResult = parser.runParse(url, document);
    parsResult.then(data => chrome.runtime.sendMessage({ message, data, params }));
	}

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.message === "run") {
      if (isProcess) {
        return;
      }
      isProcess = true;
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

