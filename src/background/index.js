// Called when the user clicks on the extension icon.
var activeTabId;
var targetTab;
var activeHash;
var unNotificationID;
var resultNotifyId;
let data;

chrome.browserAction.onClicked.addListener(function(request, sender, sendResponse) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        activeTabId = tabs[0].id;
        var data = { "message": "run" };
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
          case 'SEND_DATA':
              //console.log(request.url);
              data = request.data;
              var newURL = '/data-list/index.html';
              chrome.tabs.create({ url: newURL });
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
