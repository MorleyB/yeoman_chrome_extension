'use strict';

var RAILS_ENV = undefined;
var envUrl = undefined;
var current_url = undefined;
var current_tab_id = undefined;
var j = jQuery.noConflict();


j(document).ready(function(){

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


  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    current_url = tabs[0].url;
    current_tab_id = tabs[0].id;
  });


  function populateSelectBox(){
     var resp = {"streams": [ {name: "theName", id: "1"}, {name: "otherName", id: "2"}]};
     var optionTemplate = "<option value=\"{streamID}\">{streamName}</option>";
     for(var i = 0; i < resp.streams.length; i++){
       var obj = resp.streams[i];
       var currentOptionTemplate = optionTemplate;
       currentOptionTemplate = currentOptionTemplate.replace("{streamID}", obj.id);
       currentOptionTemplate = currentOptionTemplate.replace("{streamName}", obj.name);
       j("#selectedStream").append(j(currentOptionTemplate));
     }
  }


  function GETStreamOrRedirect() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "#{envUrl}/streams", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // var resp = JSON.parse(xhr.responseText);
        // pass to list stream function
      } else {
        if (xhr.status == 401) {
          chrome.tabs.update(current_tab_id, {url: envUrl + "sign_in"});
        } else {
        //   alert('not hooked up yet');
        }
      }
    }
    xhr.send();
    populateSelectBox();
  }


  window.onload = function() {
    setTimeout(function() {
      j("#current_location").html(current_url);
    }, 0);
  }

  GETStreamOrRedirect();
});

