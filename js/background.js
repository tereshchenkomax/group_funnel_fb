// Called when the user clicks on the extension icon.
let activeTabId, targetTab, activeHash, unNotificationID, resultNotifyId, data, params

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
          case 'ACTION::SEND_DATA':
              data = request.data;
              var newURL = '/data-list/index.html';
              chrome.tabs.create({ url: newURL });
            break;
          case 'SEND_DATA':
              //console.log(request.url);
              data = request.data;
              var newURL = '/data-list/index.html';
              chrome.tabs.create({ url: newURL });
              break;
        case 'OPEN_PAGE':
              chrome.tabs.create({ url: request.url });
              break;
        case 'GET_DATA':
              sendResponse(data)
              break;
        }
    }
);

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
