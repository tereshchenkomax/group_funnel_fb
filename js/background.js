// Called when the user clicks on the extension icon.
let activeTabId, targetTab, activeHash, unNotificationID, resultNotifyId, data, params = {};

let middlewarePageId, middlewarePageUrl;

chrome.storage.sync.get(['params'], ({params}) => { params = {...params} });

chrome.browserAction.onClicked.addListener(function(request, sender, sendResponse) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        activeTabId = tabs[0].id;
        var data = {
          message: "run",
          url: tabs[0].url,
          params: {}
        };
        if(targetTab != undefined){
            data['activeHash'] = activeHash;
        }
        sendMessage(data);
    });
});

// open new tab or show notification
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.message) {
      case 'ACTION::SAVE_PARAMS':
        params = request.params;
        setParams(params);
        break;
      case 'ACTION::RUN':
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            activeTabId = tabs[0].id;
            var data = {
              message: "run",
              url: tabs[0].url,
              params: request.params
            };

            if(targetTab != undefined){
                data['activeHash'] = activeHash;
            }
            sendMessage(data);
        });
        break;
      case 'CLOSE_PAGE':
        chrome.tabs.remove(middlewarePageId);
        break;
      case 'ACTION::SEND_DATA':
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            activeTabId = tabs[0].id;
            var data = {
              message: "run:upload",
              url: tabs[0].url,
              params: request.params
            };
            setParams(request.params);
            if(targetTab != undefined){
                data['activeHash'] = activeHash;
            }
            sendMessage(data);
        });
        break;
        case 'ACTION::SEND_DATA:BACKGROUND':
          data = request.data;
          var newURL = '/data-list/index.html';
          chrome.tabs.create({ url: newURL }, ({ id, url }) => {
            middlewarePageId = id;
            middlewarePageUrl = url;
            setTimeout(() => chrome.tabs.sendMessage(id, { message: "UPLOAD_TO_G_SPREADSHEETS" }), 1000)
          });
        break;
      case 'SEND_DATA':
        //console.log(request.url);
        data = request.data;
        var newURL = '/data-list/index.html';
        chrome.tabs.create({ url: newURL }, ({ id, url }) => {
          middlewarePageId = id;
          middlewarePageUrl = url;
        });
        break;
      case 'OPEN_PAGE':
        chrome.tabs.create({ url: request.url });
        break;
      case 'GET_DATA':
        sendResponse({data, params})
        break;
      case 'GET_PARAMS':
        sendResponse({params});
        break;
      case 'ACTION::SAVE_PARAMS':
        params = request.params;
        setParams(params);
        break;
      }
  }
);

const setParams = (params) => chrome.storage.sync.set({ params: {...params} });

/* Respond to the user's clicking one of the buttons */
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {

});

chrome.tabs.onRemoved.addListener(function(tab){
  if (targetTab != undefined) {
    if(targetTab.id == tab){
      targetTab = undefined;
      var data = {
        "message": "remove_hash"
      }
      sendMessage(data)
    }
  }
});

function sendMessage(data){
    chrome.tabs.sendMessage(activeTabId, data);
}

/* Create notification id */
function getNotificationId() {
    var id = Math.floor(Math.random() * 1337) + 1;
    return id.toString();
}
