"use strict";

(function () {
	//document.body.dataset.new_full_url = chrome.extension.getURL('salestools.html#' + document.location);
	var activeHash;
  var isProcess = false;

  var labelsMap = {
    //group: 'group Id',
    groupName: 'Group name',
    userId: 'user ID',
    userCounter: 'User Counter',
    name: 'Facebook username',
    profileUrl: 'User profile URL',
    //avatarImage: 'Avatar',
    joinedFacebookOn: 'Joined on Facebook',
    from: 'From',
    livesIn: 'Lives In',
    worksAt: 'Works At',
    wentTo: 'Went to',
    studiedAt: 'Studied at',
  }

	function run({url, params={}}) {
      parse(url, params);
	};

  function run_n_upload({url, params={}}) {
      parse(url, params, 'ACTION::SEND_DATA:BACKGROUND');
  };

	function parse(url, params, message='SEND_DATA') {
		var parser = new Parser(params);
		const parsResult = parser.runParse(url, document);
		// parsResult.then(data => {
  //     let grid = [];
  //     let labels = {};
  //     let labelsArr = [];
  //     data.forEach(item => {
  //       let row = [];
  //       Object.keys(item).forEach((key) => {
  //         if (key !== "avatarImage" || key !== "group"){
  //           let label = labelsMap[key];
  //           if ((key !== "answers") && !Array.isArray(item[key]) ) row.push({value: item[key]});
  //           if (!!label && (!labels[label] && key != "answers")) labels[label] = true;
  //           if(key == "answers"){
  //             item[key].forEach((q,i) => {
  //               let n = i+1;
  //               row.push({value: q.question});
  //               row.push({value: q.answer});
  //               if (!labels['Q'+n]) labels['Q'+n] = true;
  //               if (!labels['A'+n]) labels['A'+n] = true;
  //             })
  //           }
  //         }
  //       });
  //       grid.push(row);
  //     })

  //     Object.keys(labels).forEach((key) => {
  //       labelsArr.push({ value: key});
  //     })

  //     grid.unshift(labelsArr);

  //     isProcess = false;

  //     //grid.splice(0, 1);

  //     data = grid.map(item => item.map(k => k.value));

  //     async function send() {
  //       const normalSize = 100
  //       const parts = Math.ceil( data.length/normalSize);
  //       if (parts > 1) {
  //         let subarray = []; //массив в который будет выведен результат.
  //         for (let i = 0; i < Math.ceil(data.length/normalSize); i++){
  //             subarray[i] = data.slice((i*normalSize), (i*normalSize) + normalSize);
  //         }
  //         subarray.forEach(async (arr) => {
  //           await axios.post(`${params.serverUrl}/resendToSpreadSheets`, {
  //             spreadsheetsUrl: params.spreadsheetsUrl,
  //             getAllEntities: params.getAllEntities,
  //             userEmail: params.userEmail,
  //             data: arr
  //           })
  //         })
  //       }
  //       axios.post(`${params.serverUrl}/resendToSpreadSheets`, {
  //           spreadsheetsUrl: params.spreadsheetsUrl,
  //           getAllEntities: params.getAllEntities,
  //           userEmail: params.userEmail,
  //           data
  //         });
  //     };
  //     send();
  //     return chrome.runtime.sendMessage({message: 'OPEN_PAGE', url: params.spreadsheetsUrl});
  //   });
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
