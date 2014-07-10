var j = jQuery.noConflict();
// j( document ).ready(function() {
  setInterval(
    function() {
      addToInbox();
    },
    250
  );
// });

// Inbox View
function addToInbox() {
  if(j('td.apU.xY').length && j('.inbox-container').length === 0) {
    j('<div class="inbox-container"><div class="inbox-icon1" data-tooltip="Add contact to stream"></div></div>').insertAfter('td.apU.xY > span:first-child');
  }
}

function addToEmail() {
} 

function manageContact() {
// Manage Contact
}

function isInStream() {
  // talk to ruby
}
