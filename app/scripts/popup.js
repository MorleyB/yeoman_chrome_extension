'use strict';

var RAILS_ENV = undefined;
var envUrl = undefined;
var current_url = undefined;
var current_tab_id = undefined;
var j = jQuery.noConflict();
var xhr = new XMLHttpRequest();


j(document).ready(function(){

  switch (RAILS_ENV) {
    case "staging":
      envUrl = "https://staging.touchstream.io/auth/google/";
      break
    case "production":
      envUrl = "https://touchstream.io/auth/google/";
      break
    default:
      envUrl = "http://lvh.me:3000/";
  }


  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    current_url = tabs[0].url;
    current_tab_id = tabs[0].id;
  });


  function populateSelectBox(resp){
     var streamTemplate = "<li id=\"{streamID}\" class=\"list\">{streamName}</li>";
     for(var i = 0; i < resp.length; i++){
       var obj = resp[i];
       var currentStreamTemplate = streamTemplate;
       currentStreamTemplate = currentStreamTemplate.replace("{streamID}", obj.id);
       currentStreamTemplate = currentStreamTemplate.replace("{streamName}", obj.name);
       j("#streams-list").append(currentStreamTemplate);
     }
  }


  function GETStreamOrRedirect() {
    xhr.open("GET", envUrl + "streams.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        populateSelectBox(resp);
      } else {
        if (xhr.status == 401) {
          chrome.tabs.update(current_tab_id, {url: envUrl + "auth/google"});
        } else {
        //   alert('not hooked up yet');
        }
      }
    }
    xhr.send();
  }

  j("#streams-list").on("click", "li.list", function(e) {
    j('#streams-list li').removeClass('selected-list');
    var selected_list = j(e.target);
    j(e.target).addClass('selected-list');
  });

	j("#saveButton").click(function() {
		var ID = j(".selected-list")[0].getAttribute('id');
    var subject = j('input').val();
		var blurb = j("#blurb_stream").val();

    // check this!
		if(blurb.length != '' && ID != undefined && subject.length != ''){
  		xhr.open("POST", envUrl + "streams/" + ID + "/touches/new?subject=" + subject + "&body=" + blurb, true);
      debugger
  		xhr.onreadystatechange = function() {
  			if (xhr.readyState == 4) {
  				console.log('saved!');
  				} else {
  				alert('not working');
  				}
      	}
      	xhr.send();
		}
	});

  setTimeout(function() {
  	var prefill = "Thought you might find this interesting. &#013; &#013;" + current_url;
    j("#blurb_stream").html(prefill);
  }, 100);


  GETStreamOrRedirect();
});

