window.onload = function () {

  var jq = document.createElement('script');
  jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
  document.getElementsByTagName('body')[0].appendChild(jq);

  var gm = document.createElement('script');
  gm.src = "https://rawgit.com/KartikTalwar/gmail.js/master/gmail.min.js";
  document.getElementsByTagName('body')[0].appendChild(gm);

  var md = document.createElement('script');
  md.scr = "https://rawgit.com/anseki/jquery-plainmodal/master/jquery.plainmodal.min.js";
  document.getElementsByTagName('body')[0].appendChild(md);

  var ms = document.createElement('script');
  ms.src = "https://rawgit.com/MorleyB/yeoman_chrome_extension/master/app/scripts/gm_inject.js";
  document.getElementsByTagName('body')[0].appendChild(ms);

}
