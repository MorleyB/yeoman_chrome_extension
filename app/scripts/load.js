window.onload = function () {

  var jq = document.createElement('script');
  jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
  document.getElementsByTagName('body')[0].appendChild(jq);

  var sm = document.createElement('script');
  sm.src = "https://rawgit.com/KartikTalwar/gmail.js/master/gmail.min.js";
  document.getElementsByTagName('body')[0].appendChild(sm);

  var sm = document.createElement('script');
  sm.src = "https://rawgit.com/MorleyB/yeoman_chrome_extension/master/app/scripts/gm_inject.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
}
