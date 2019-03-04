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

  this.setJoinedFacebookOn = function (joined) {
    this.joinedFacebookOn = joined;
  };

  this.setFrom = function (from) {
    this.from = from;
  };

  this.setLivesIn = function (livesIn) {
    this.livesIn = livesIn;
  };

  this.setWorksAt = function (worksAt) {
    this.worksAt = worksAt;
  };

  this.setWentTo = function (wentTo) {
    this.wentTo = wentTo;
  };

  this.setStudiedAt = function (studiedAt) {
    this.studiedAt = studiedAt;
  };

  this.setRequestTime = function (requestTime) {
    this.requestTime = requestTime;
  };
}

Record.prototype.toObject = function () {
  return {
    //group: this.group || '',
    groupName: this.groupName || '',
    userId: this.userId || '',
    name: this.name || '',
    profileUrl: this.profileUrl || '',
    //avatarImage: this.avatarImage || '',
    answers: this.answers || Array(3).fill(''),
    joinedFacebookOn: this.joinedFacebookOn || '',
    from: this.from || '',
    livesIn: this.livesIn || '',
    worksAt: this.worksAt || '',
    wentTo: this.wentTo || '',
    studiedAt: this.studiedAt || '',
    requestTime: this.requestTime || '',
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

/* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"[object ArrayBuffer]"===R.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===R.call(e)}function d(e){return"[object File]"===R.call(e)}function l(e){return"[object Blob]"===R.call(e)}function h(e){return"[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:v,merge:x,extend:b,trim:w}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(6),i=n(2),s=n(17),u=n(18);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={}}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u)}),e.exports=a},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w)}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=n(16),v=(e.withCredentials||u(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function n(){this.message="String contains an invalid character"}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(19),s=n(20),u=n(6),a=n(21),c=n(22);e.exports=function(e){r(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});
//# sourceMappingURL=axios.min.map
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
let language;
if (window.navigator.languages) {
    language = window.navigator.languages[0];
} else {
    language = window.navigator.userLanguage || window.navigator.language;
}

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // hour: 'numeric',
  // minute: 'numeric',
};

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
          //if(allEntites.length === this.state.allEntitesCount) {
            clearTimeout(intervalId);
            if(!this.state.params.entities || this.state.params.entities == 'all'){
              resolve(this.getList(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]", document));
            }
            resolve(this.getList(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]/div/div/div/div[last()]/ul/li[not(i)]/ancestor::li[not(@class)]/div", document));
          //};
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

        let ifor = 0;
        switch(answersRaw.length) {
          case 0:
            ifor = 3;
          break;
          case 1:
            ifor = 2;
          break;
          case 2:
            ifor = 1;
          break;
          case 3:
            ifor = 0;
          break;
        }

        for (var i = 0; i < ifor; i++) {
          let resAnswer = new answerRecord;
          resAnswer.setQuestion('');
          resAnswer.setAnswer('');
          answers.push(resAnswer.toObject());
        }

        record.setAnswers(answers);

        const additionalRaw = this.getElementsByXPath(".//body/div/div/div/div/ul/li/i/../span[contains(text(), '2004') or contains(text(), '2005') or contains(text(), '2006') or contains(text(), '2007') or contains(text(), '2008') or contains(text(), '2009') or contains(text(), '2010') or contains(text(), '2011') or contains(text(), '2012') or contains(text(), '2013') or contains(text(), '2014') or contains(text(), '2015') or contains(text(), '2016') or contains(text(), '2017') or contains(text(), '2018') or contains(text(), '2019')]/following::li/i/../span", dom);

        additionalRaw.forEach((i, idx, array) => {
            let additionalDom = this.getHTMLFromString(i.innerHTML);
            const tryTime = document.evaluate("normalize-space(//span/text())", additionalDom, null, XPathResult.STRING_TYPE, null).stringValue;

            if (!!tryTime && !!tryTime.match && tryTime.match(/20\w+($|\s)/)) {
              record.setJoinedFacebookOn(tryTime);
            }

            const city = document.evaluate("normalize-space(//span/a[contains(@href, 'facebook.com/pages/')]/text())", additionalDom, null, XPathResult.STRING_TYPE, null).stringValue;

            if (!!city) {
              record.setFrom(city);
              record.setLivesIn(city);
            }

            const work = document.evaluate("normalize-space(//span/a[not(contains(@href, 'facebook.com/pages/'))]/text())", additionalDom, null, XPathResult.STRING_TYPE, null).stringValue;

            if (!!work) {
              record.setWorksAt(work);
            }

            if (idx === additionalRaw.length - 1){
              const studiedAt = document.evaluate("normalize-space(//span/a[not(contains(@href, 'facebook.com/pages/'))]/text())", dom, null, XPathResult.STRING_TYPE, null).stringValue;

              if (!!studiedAt) {
                record.setStudiedAt(studiedAt);
              }
            }
        });

        let requestTime = document.evaluate("normalize-space(//span/*[contains(@class, 'livetimestamp') or contains(@data-utime, number() > 1199134800)]/text())", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        if (!!requestTime && !requestTime.match(/(\s|\,)\d{4}/)) {
          if (requestTime.match(/\w{1,2}(\s)?(hour|ч|h|часа)|(час|hour)/)){
            let hours = requestTime.replace(/\D/g, '');
            if (!hours) {
              hours = 1;
            }
            var d = new Date();
            requestTime = new Date(d.setHours(d.getHours() - hours));
            requestTime = requestTime.toLocaleString(language, options);
          }
          if (requestTime.match(/\w{1,2}(\s)(min|m|м)/)){
            var d = new Date();
            requestTime = d.toLocaleString(language, options);
          }
        }

        record.setRequestTime(requestTime);

        resolve(record.toObject());
      } catch(err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
