'use strict';

document.addEventListener('DOMContentLoaded', function () {

  chrome.runtime.sendMessage({ "message": "GET_PARAMS"}, params => {
    if(!!params){
      if(!!params.entities){
        document.getElementById(params.entities).checked = true;
      }
      if(!!params.stylesheetUrl){
        document.getElementById("stylesheetUrl").value = params.stylesheetUrl;
      }
    }
  });

  function getParams(){
    let params={};
    const formData = new FormData(document.getElementById("settings"));
    formData.forEach(function(value, key){
      params[key] = value;
    });
    console.log('params', params)
    return params;
  }

  function getEntities() {
    const params = getParams();
    chrome.runtime.sendMessage({ "message": "ACTION::RUN", params })
  }

  document.getElementById("getEntities").addEventListener("click", getEntities, false);

  function uploadData() {
    const params = getParams();
    chrome.runtime.sendMessage({ "message": "ACTION::SEND_DATA", params })
  }

  document.getElementById("upload").addEventListener('click', uploadData, false);

  function saveSettings() {
    const params = getParams();
    chrome.runtime.sendMessage({ "message": "ACTION::SAVE_PARAMS", params })
  }

  document.getElementById("saveSettings").addEventListener('click', saveSettings, false);

});
