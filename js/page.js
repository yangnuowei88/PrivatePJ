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


//处理摇一摇
    (function(){
      var SHAKE_THRESHOLD = 800;
      var last_update = 0;
      var x, y, z, last_x = 0, last_y = 0, last_z = 0;

      function deviceMotionHandler(eventData) {
        var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime-last_update)> 100) {
          var diffTime = curTime -last_update;
          last_update = curTime;
          x = acceleration.x;
          y = acceleration.y;
          z = acceleration.z;
          var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;

          if (speed > SHAKE_THRESHOLD && $("#layout_6").hasClass("animate")) {
            _this.page(6, _h);
          }
          last_x = x;
          last_y = y;
          last_z = z;
        }
      }
      if (window.DeviceMotionEvent) {
        //不知道为什么加到DOM上不好使
        //document.getElementById("layout_6").addEventListener('devicemotion',deviceMotionHandler,false);
        window.addEventListener('devicemotion',deviceMotionHandler,false);
      } else {
        document.getElementById("layout_6").innerHTML = "Not supported on your device."
      }


    })()

//处理预加载
    ;(function(){
      var l=0;
      var imgs;
      var sum=0;
      var imgs=new Array();
      var imgUrlBase="images/";
      var imgUrlArray= ['sec01-1.png','sec01-2.png','sec01-3.png','sec01-bg.png','sec02-1.png','sec02-2.png','sec02-3.png','sec02-4.png','sec02-bg.png'];
      function chk(){
        l--;
        //我的项目没有表示进度的数字
        //document.getElementById("loadingNum").innerText=""+((sum-l)*100/sum)+"%"
        if (l==0){
          for (var i=0;i<sum;i++)
          //绑定滑动事件哈
            _this.swipe(_h, _len);
          $("#swipe_tip_first").css("visibility","visible");
          //if(_w<_h){
          _this.page(1, _h);
        }
        //}
      }
      for(var j=0;j<imgUrlArray.length;j++){
        imgs[j]=new Image();
        imgs[j].src=imgUrlBase+imgUrlArray[j]
      }
      sum=l=imgs.length;
      for (var i=0;i<l;i++){
        imgs[i].onload=chk;
        imgs[i].onerror=chk;//无论图片是否加载成功，都执行指定方法
      }

    })()

  }
}
Layout.init();





// 调用
/*loadImg(pics, function() {
  setTimeout(function() {
    $(".loadPage").hide();
    $('#layout_1').addClass('animate');
  }, 500);
});*/
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