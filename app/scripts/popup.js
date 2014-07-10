'use strict';

console.log('\'Allo \'Allo! Popup');

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  var current_url = tabs[0].url
  $('#current_location').html(current_url)
});
