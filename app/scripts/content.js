var j = jQuery.noConflict();
// j( document ).ready(function() {
  setInterval(
    function() {
      addToInbox();
      addToEmail();
    },
    250
  );
// });

// Inbox View
function addToInbox() {
  if(j('div.J-J5-Ji.J-JN-M-I-JG').length && j('.inbox-container').length === 0) {
    j('<div class="inbox-container"><div class="inbox-icon1" data-tooltip="Add contact to stream"></div></div>').insertAfter('td.apU.xY > span:first-child');
  }
}

function addToEmail() {
  if(j('h2.hP').length && j(":contains('Add Contact to Stream')").length === 0) {
    j('<div id="" class="T-I J-J5-Ji ar7 nf T-I-ax7 L3" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" style="-webkit-user-select: none;"><span class="Ykrj7b">Add Contact to Stream</span></div>').insertAfter('div.iH > div > div:nth-last-child(2)');
  }
}

function manageContact() {
// Manage Contact
}

function isInStream() {
  // talk to ruby
}
