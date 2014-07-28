'use strict';

var RAILS_ENV = undefined;
var envUrl = undefined;
var current_url = undefined;
var current_tab_id = undefined;
var j = jQuery.noConflict();
var xhr = new XMLHttpRequest();
var is_loggedin = undefined;


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
    var streamTemplate = "<li id=\"{streamID}\" class=\"label label-default list\" data-type=\"{streamType}\">{streamName}</li>";
    var currentStreamTemplate = undefined;
    for(var i = 0; i < resp.length; i++){
      var obj = resp[i];
      currentStreamTemplate = streamTemplate;
      currentStreamTemplate = currentStreamTemplate.replace("{streamID}", obj.id);
      currentStreamTemplate = currentStreamTemplate.replace("{streamName}", obj.name);
      currentStreamTemplate = currentStreamTemplate.replace("{streamType}", obj.type);
      j("#streams-list").append(currentStreamTemplate);
    }
  }


  var today = new Date();
  var date_string = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
  j('.datepicker').data('date', date_string);
  j('.datepicker').datepicker()
  .on('changeDate', function(ev) {
    this.value = ev.date;
  });



  function GETStreamOrRedirect() {
    var request = j.ajax({
       type: "get",
       url: envUrl + "streams.json",
       dataType: "json"
    });
    request.done(
      function( response ){
        is_loggedin = true
        populateSelectBox(response);
      }
    );
    request.fail(
      function(){
        j('.long-msg').toggleClass('display');
        chrome.tabs.update(current_tab_id, {url: envUrl + "auth/google"});
      }
    );
  }


  j("#streams-list").on("click", "li.list", function(e) {
    j('#streams-list li').removeClass('selected-list');
    var selected_list = j(e.target);
    j(e.target).addClass('selected-list');

    if (selected_list.data('type') != 'ScheduledStream') {
      j('#blurb_schedule').hide();
    } else {
      j('#blurb_schedule').show();
    }
  });



  function errorNotification() {
    if (is_loggedin == false) {
      j('#body-container').toggleClass("animated pulse");
    }

    if (is_loggedin == true) {
      if (j('li').hasClass('selected-list')) {
      } else {
        j('.b-list').removeClass('display');
      }
      if (j('#blurb_subject').html() == '') {
        j('.b-subject').removeClass('display');
      }
      if (j("#blurb_stream").html() == '') {
        j('.b-stream').removeClass('display');
      }
      if (j('.datepicker').val() == '') {
        j('.b-schedule').removeClass('display');
      }
      setTimeout(function() {
        j('.badge').addClass('display');
      }, 1000);
    }
  }



  /// save button to touchstream
  j("#saveButton").click(function () {
    if (is_loggedin == true && j(".selected-list").length > 0 ) {
      var id = j(".selected-list")[0].getAttribute('id');

      if (j('#blurb_subject').html() == '' || j("#blurb_stream").html() == '' || j('.datepicker').val() == '' ) {
        errorNotification();
        return
      }

      j.ajax({
        type: 'post',
        url: envUrl + 'streams/' + id + '/touches',
        dataType: 'json',
        data: { touch: { string_id: id, subject: j('#blurb_subject').html(), body: j("#blurb_stream").html(), schedule_on: j('.datepicker').val() }},
        success: resetView()
      })

    } else {
      errorNotification();
    }
  });

  function resetView() {
    j("#blurb_stream").html('')
    j('.datepicker').val('')
    j('#blurb_subject').html('')
    j('#streams-list li').removeClass('selected-list');
    j('#saveButton').html('Saved');
    setTimeout(function() {
      j('#saveButton').html('Add to Queue');
    }, 100);
  }


  setTimeout(function() {
  	var prefill = current_url;
    if (prefill.match('accounts.google') != undefined) {
      prefill = ''
    }
    j("#current-url").html(prefill);
  }, 2000);


  GETStreamOrRedirect();
});

