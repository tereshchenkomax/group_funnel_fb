'use strict';

document.addEventListener('DOMContentLoaded', function () {

  function getEntities() {
    let params = {}
    const formData = new FormData(document.getElementById("settings"));
    formData.forEach(function(value, key){
      params[key] = value;
    });
    chrome.runtime.sendMessage({ "message": "ACTION::RUN", params })
  }

  document.getElementById("getEntities").addEventListener("click", getEntities, false);

  function uploadData() {
    chrome.runtime.sendMessage({ "message": "ACTION::SEND_DATA" })
  }

  document.getElementById("upload").addEventListener('click', uploadData, false);

  function saveSettings() {
    let params={};
    const formData = new FormData(document.getElementById("settings"));
    formData.forEach(function(value, key){
      params[key] = value;
    });
    chrome.runtime.sendMessage({ "message": "ACTION::SAVE_PARAMS", params })
  }

  document.getElementById("saveSettings").addEventListener('click', saveSettings, false);

});
