'use strict';

var RAILS_ENV = 'development';
var envUrl = undefined;

switch (RAILS_ENV) {
  case "staging":
    envUrl = "https://staging.touchstream.io/auth/google/";
    break
  case "production":
    envUrl = "https://touchstream.io/auth/google/";
    break
  default:
    envUrl = "http://lvh.me:3000/auth/google/";
}


function GETStream() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "#{envUrl}/streams", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // var resp = JSON.parse(xhr.responseText);
      // pass to list stream function
    } else {
      // alert('not hooked up yet')
      var resp = {"streams": [ {"sweet":"cookies", "savory":"pizza"}]}
    }
  }
  xhr.send();
}

GETStream();


chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  var current_url = tabs[0].url
  $("#current_location").html(current_url)
});
