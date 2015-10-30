/* ua */
var UA = function(){
  var userAgent = navigator.userAgent.toLowerCase();
  return {
    ipad: /ipad/.test(userAgent),
    iphone: /iphone/.test(userAgent),
    android: /android/.test(userAgent),
    qqnews: /qqnews/.test(userAgent),
    weixin: /micromessenger/.test(userAgent)
  };
}
function compareVersions(v1, comparator, v2) {
  comparator = comparator == '=' ? '==' : comparator;
  var v1parts = v1.split('.'), v2parts = v2.split('.');
  var maxLen = Math.max(v1parts.length, v2parts.length);
  var part1, part2;
  var cmp = 0;
  for(var i = 0; i < maxLen && !cmp; i++) {
    part1 = parseInt(v1parts[i], 10) || 0;
    part2 = parseInt(v2parts[i], 10) || 0;
    if(part1 < part2)
      cmp = 1;
    if(part1 > part2)
      cmp = -1;
  }
  return eval('0' + comparator + cmp);
}
/* page */
var Layout = {
  isScrll : false ,
  page: function (i, _h){
    $(".global").css({ "-webkit-transform": "translate3d(0px, -" + _h * i +"px, 0px)" });
    $(".layout").removeClass("animate");
    $("#layout_" + (i + 1)).addClass("animate");
  },
  swipe: function(_h, _len){

    var _this = this;
    $(".layout").each(function(index, obj){
      $(obj).on("swipeUp", function(){
        if(index<_len-1){
          _this.page(index + 1, _h);}
      }).on("swipeDown", function(){
          _this.page(index - 1, _h);
        });
    });
  },
  init: function(){
    var _this = this,
      _w = $(window).width(),
      _h = $(window).height(),
      _len = $(".layout").length;
    var ua = UA();
    $(".swipe_tip").addClass("fadeOutUp");
    $(".global").width( _w ).height( _h * _len ).addClass("ease");
    $(".screen").width( _w ).height( _h * _len );
    $(".layout").width( _w ).height( _h );
    _this.page(0, _h);
    _this.swipe(_h, _len);
  }
}
Layout.init();

// 调用
loadImg(pics, function() {
  setTimeout(function() {
    $(".loadPage").hide();
    $('#layout_1').addClass('animate');
  }, 500);
});


// 翻转的绑定
//window.onorientationchange = orientationChange;
window.addEventListener("resize",orientationChange,false);

function initPage(){
  pageWidth = $(document).width();
  pageHeight = $(".wrap").height();
  pages = $(".wrap section");

  //alert("宽："+ pageWidth +"；高："+ pageHeight);

  $(".wrap section").css({
    "width":pageWidth+"px",
    "height":pageHeight+"px"
  });
  $(".line").css({
    "width":pageWidth+"px",
    "height":pageHeight * 6 +"px"
  });

  secHeight = pageHeight * $(".wrap section").length;

  $(".sec, .line").addClass("drag");
  //animatePage(curPage);
  if(pageWidth > pageHeight){
    $('body').addClass('horizontal');
  }
  if(pageWidth == 360){
    $('body').addClass('w360');
    if(pageHeight == 575){
      //alert('三星@');
      $('body').addClass('h575');
    }
  }
  if(pageWidth == 540){
    $('body').addClass('w540');
  }
  if(pageHeight == 416){
    $('body').addClass('h416');
  }
  dragx(oPersonshow, pageWidth, person_num, oPoint);
}
function orientationChange(){
  initPage();
}
<!-- music -->
var audio = document.getElementById("audio");
$(".icon-play").click(function(){
  var _pl = $(this).attr('status');
  if (_pl =="pause"){
    $(this).addClass('playing').removeClass('pause').attr('status','playing');
    audio.play();
  }else{
    $(this).removeClass('playing').addClass('pause').attr('status','pause');
    audio.pause();
  }
});

$('html').one('touchstart',function(){
  audio.play()
});


audio.addEventListener('ended', function () {
  //等待100毫秒
  setTimeout(function () { audio.play(); }, 100);
}, true);
audio.play();
