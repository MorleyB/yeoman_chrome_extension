var runCode = function() {
  // TODO: MODAL
    // $(document.body).append('<div id="modal"><p>TESTING</p></div>');
    //   var modal = $('#modal').plainModal({duration: 500});
    // $(":contains('Add Contact to Stream')").click(function(){
    //   modal.plainModal('open');
    // });
  setInterval(
    function() {
      addButton();
      // TEMPORARY - JUST GETTING VALUES TO USE
      getValues();
    },
    250
  );
}

var checkLoaded = function() {
  if(window.jQuery && Gmail && Gmail().get && Gmail().get.user_email) {
    $.fn.onAvailable = function(e) {
      var t = this.selector;
      var n = this;
      if (this.length > 0) e.call(this);
      else {
        var r = setInterval(function () {
          if ($(t).length > 0) {
            e.call($(t));
            clearInterval(r);
          }
        }, 50);
      }
    };

    runCode();

  } else {
    setTimeout(checkLoaded, 100);
  }
}

checkLoaded();

function addButton() {
  if($('h2.hP').length && $(":contains('Add Contact to Stream')").length === 0) {
    $('<div id="" class="T-I J-J5-Ji ar7 nf T-I-ax7 L3" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" style="-webkit-user-select: none;"><span class="Ykrj7b">Add Contact to Stream</span></div>').insertAfter('div.iH > div > div:nth-last-child(2)');
  }
}

function getValues() {
  url = location.href;
  if(url.length() >= 55 && url.length() <= 60) {
    // WHICH THREAD
    var id = Gmail().get.email_id();
    
    // EVERYTHING ABOUT THREAD
    var data = Gmail().get.email_data(id);

    // EMAIL ADDRESSES
    var me = Gmail().get.user_email();
    var everyone = data.threads.people_involved; 
  }
}
