var runCode = function() {
  setInterval(
    function() {
      addButton();
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

    // your code
    runCode();
    $(document.body).append('<div id="modal"></div>');

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

$(":contains('Add Contact to Stream')").click(function() {
  $('#modal').plainModal('open');
});
