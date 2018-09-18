/**
 * Helper class contain all helper functions
 */
;var Helper = {
    /**
     * Parse string to JSON
     *
     * @param str
     */
    parseToJson: function (str) {
        return JSON.parse(str.replace(/\\u002d/g, "-"));
    },

    /**
     * Returns full name
     * @param base
     * @param url
     * @returns {*}
     */
    getFullUrl: function (base, url) {
        return /^https?:\/\//i.test(url) ? url : base + url.replace(/^\/+/, "");
    },

    checkValidHeadline: function(str) {
        var valid = true;
        var re = new RegExp('^[\\W]+$', 'giu');
        if(str.match(re) != null){
            valid = false;
        }
        return valid;
    },

    getCompanyName: function(str) {

        var companyName;

        var companyNameWithAt = str.lastIndexOf(" at ");

        if(companyNameWithAt != -1){
           companyName = str.substring(companyNameWithAt+3,str.length)
        }

        var companyNameWithDog = str.lastIndexOf(" @ ");

        if(companyNameWithDog != -1 ){
            companyName = str.substring(companyNameWithDog+2,str.length);
        }

        var companyNameDeutsch = str.lastIndexOf(" bei ");

        if(companyNameDeutsch != -1 ){
            companyName = str.substring(companyNameDeutsch+4,str.length);
        }

        var companyNameFrench = str.lastIndexOf(" chez ");

        if(companyNameFrench != -1 ){
            companyName = str.substring(companyNameFrench+5,str.length);
        }

        var companyNameSweeden = str.lastIndexOf(" på ");

        if(companyNameSweeden != -1 ){
            companyName = str.substring(companyNameSweeden+3,str.length);
        }

        var companyNameDanish = str.lastIndexOf(" hos ");

        if(companyNameDanish != -1 ){
            companyName = str.substring(companyNameDanish+4,str.length);
        }

        return companyName;
    },

    getUrlVars: function (url) {
        var vars = [], hash;
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    getElementByXpath: function (path, domDocument) {
        return document.evaluate(path, domDocument, null, XPathResult.ANY_TYPE, null);
    },
    
    clearName: function (name) {
        if (name) {
            name = name.replace(/<\/?b>/ig, "");
        }

        name = $('<textarea />').html(name).text();

        return name;
    },

    getNodeComment: function(el) {
        if(el) {
            for(var i = 0; i < el.childNodes.length; i++) {
                var node = el.childNodes[i];
                if(node.nodeType === 8) {
                    return node.nodeValue;
                }
            }
        }

        return false;
    },

    isEmpty: function(value) {
        return (value === undefined || value == null || value.length <= 0) ? true : false;
    }
};

function Record() {
  this.setGroupName = function (name) {
    this.groupName = name;
  };
  this.setGroup = function (group) {
    this.group = group;
  };

  this.setUserId = function (userId) {
    this.userId = userId;
  };

  this.setName = function (name) {
    this.name = name;
  };

  this.setProfileUrl = function (profileUrl) {
    this.profileUrl = profileUrl;
  };

  this.setAvatarImage = function (avatarImage) {
    this.avatarImage = avatarImage;
  };

  this.setAnswers = function (answers) {
    this.answers = answers;
  };

}

Record.prototype.toObject = function () {
  return {
    group: this.group,
    groupName: this.groupName,
    userId: this.userId,
    name: this.name,
    profileUrl: this.profileUrl,
    avatarImage: this.avatarImage,
    answers: this.answers,
  };
};

function answerRecord() {
  this.setQuestion = function (question) {
    this.question = question;
  };

  this.setAnswer  = function (answer) {
    this.answer = answer;
  };

}

answerRecord.prototype.toObject = function () {
  return {
    question: this.question,
    answer: this.answer
  };
};

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

class CommonParser {
  getElementsByXPath(xpath, dom) {
    let results = [];
    let query = document.evaluate(xpath,
        dom,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    for (let i=0, length=query.snapshotLength; i<length; ++i) {
      results.push(query.snapshotItem(i));
    }
    return results;
  }
  getElementByXPath(xpath, dom) {
      return document.evaluate(xpath, dom, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  getHTMLFromString(str) {
      const parser = new DOMParser;
      return parser.parseFromString(str, 'text/html')
  }
  getListInfo(){
    let totalCount = document.evaluate("normalize-space(//*[contains(@class, 'search-results__title-and-total')]//*[contains(@class, 'results__total')]/text())", document, null, XPathResult.STRING_TYPE, null).stringValue;
    totalCount = totalCount.replace(/[^0-9,]/g, '');
    const linkButtons = this.getElementsByXPath("//*[contains(@class,'results-paginator')]/li[contains(@class, 'page-list')]//button",document);

    return {
      totalCount: totalCount,
      linkButtons: linkButtons
    }
  }
  setScrollToList(id){
    const list = document.getElementById(id);
    window.scrollTo(0, list.getBoundingClientRect().top);
  }
}
class Parser extends CommonParser{
    constructor(props) {
        super(props);
        this.state = {
          allEntites: null,
          allEntitesCount: 0,
          currUrl: window.location.href,
          groupName: null,
          params: {...props},
          contacts:{}
        };
    }

    runParse(path) {
      return new Promise((resolve, reject) => {
        let allEntites;
        if (!this.state.currUrl && !!path){
          this.state.currUrl = path;
        }
        this.state.allEntitesCount = document.evaluate("normalize-space(//*[contains(@id, 'member_requests_pagelet')]//div[contains(@direction, 'left')]/div/div/span)", document, null, XPathResult.STRING_TYPE, null).stringValue;
        this.state.allEntitesCount = parseInt(this.state.allEntitesCount.replace(/\D/g,''));
        this.state.groupName = document.evaluate("normalize-space(//*[contains(@id, 'mainContainer')]//a[contains(@href, 'groups')]/text())", document, null, XPathResult.STRING_TYPE, null).stringValue;
        allEntites = this.getElementsByXPath(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]", document)

        const intervalId = setInterval(() => {
          window.scrollTo(0,document.body.scrollHeight);
          allEntites = this.getElementsByXPath(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]", document)
          if(allEntites.length === this.state.allEntitesCount) {
            clearTimeout(intervalId);
            if(!this.state.params.entities || this.state.params.entities == 'all'){
              resolve(this.getList(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]", document));
            }
            resolve(this.getList(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]/div/div/div/div[last()]/ul/li[not(i)]/ancestor::li[not(@class)]/div", document));
          };
        }, 1500)
      });
    }

  getList(xPath) {
    return new Promise((resolve, reject) => {
      let entities = this.getElementsByXPath(xPath, document);
      let result = [];
      entities.forEach((entity, idx, array) => {
        this.parseProfile({htmlString:entity.innerHTML})
          .then(record => { return result.push(record) })
          .catch(err => { return reject(err); });
      });
      resolve(result);
    });
  }

  parseProfile({ htmlString }) {
    return new Promise((resolve, reject) => {
      try {
        let record = new Record,
            dom = this.getHTMLFromString(htmlString),
            showMoreExist = false;

        const name = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/text())", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setName(name);

        record.setGroupName(this.state.groupName)

        // const groupId = this.state.currUrl.match(/groups\/(\w+)(\/|$)/);

        // record.setGroup(groupId[1])

        const userId = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/@uid)", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setUserId(userId)

        const profileUrl = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/@href)", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setProfileUrl('https://www.facebook.com'+profileUrl)

        // const avatarImage = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/img/@src)", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        // record.setAvatarImage(avatarImage)

        const answersRaw = this.getElementsByXPath(".//body/div/div/div/div[last()]/ul/li[not(i)]", dom);

        let answers = [];

        answersRaw.forEach((i, idx, array) => {
            let answerDom = this.getHTMLFromString(i.innerHTML),
                resAnswer = new answerRecord;
            const question = document.evaluate("normalize-space(//div/text())", answerDom, null, XPathResult.STRING_TYPE, null).stringValue;
            resAnswer.setQuestion(question);
            const answer = document.evaluate("normalize-space(//text/text())", answerDom, null, XPathResult.STRING_TYPE, null).stringValue;
            resAnswer.setAnswer(answer);
            answers.push(resAnswer.toObject());
        });

        record.setAnswers(answers);

        resolve(record.toObject());
      } catch(err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
