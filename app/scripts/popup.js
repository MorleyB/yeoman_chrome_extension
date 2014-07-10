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

function populateSelectBox(){
   var resp = {"streams": [ {name: "theName", id: "1"}, {name: "otherName", id: "2"}]};
   var optionTemplate = "<option value=\"{streamID}\">{streamName}</option>";
   for(var i = 0; i < resp.streams.length; i++){
	   var obj = resp.streams[i];
	   var currentOptionTemplate = optionTemplate;
	   currentOptionTemplate = currentOptionTemplate.replace("{streamID}", obj.id);
	   currentOptionTemplate = currentOptionTemplate.replace("{streamName}", obj.name);
	   $("#selectedStream").append($(currentOptionTemplate));
   }
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
      //resp.streams 
      //get select box from pop.html with jquery and create options for select box using resp
    }
  }
  xhr.send();
  populateSelectBox(); 
}

GETStream();


chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  var current_url = tabs[0].url
  $("#current_location").html(current_url)
});
