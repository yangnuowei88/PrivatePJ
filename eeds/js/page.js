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
//处理点击切换到第二个tab
    ;(function(){
    //点击出来明星
      $(".sec07-list").tap(function(){
        $(this).next().find("img").each(function(index,value){
          //setTimeout(function(){
            $(value).addClass("animate-sec07-list"+index);

         // },(100+index*100))

        })
      })

//点击美女头像
      $(".people").add(".starList img").tap(function(){
      $(".close").css("display","block");
        var peopleIndex =$(".people").index(this)===-1?$(".starList img").index(this):$(".people").index(this);

        $(".pop-up").eq(peopleIndex).css("display","block");

        //点击衣服
        $(".clickTu").eq(peopleIndex).tap(function(){
          $(this).css("display","none");
          $(".pop-up").css("display","none");
          $(".pop-up-second").eq(peopleIndex).css("display","block");

          //点击放大，目前费劲了，吧这个元素隐藏了
          $(".scaleTu").eq(peopleIndex).tap(function(){
            $(this).css("display","none");
            $(".course_outline_ul_second").addClass("scaleTu2");
            //要放大的图片
           var scaleImg= $(".course_outline_ul_second").eq(peopleIndex).find("img").eq(0)[0];
            var hammertime = new Hammer(scaleImg);
                   //添加事件
                    hammertime.on("pan", function (e) {
                      //document.getElementById("result").innerHTML += "X偏移量：【" + e.deltaX + "】，Y偏移量：【" + e.deltaY + "】<br />";
                         //控制台输出
                          //console.log(e);
                      $(".course_outline_ul_second").eq(peopleIndex).find("img").eq(0).css({'-webkit-transform':'translate('+ e.deltaX+'px,'+ e.deltaY+'px)','transform':'translate('+ e.deltaX+'px,'+ e.deltaY+'px)'} );
                     // e.stopPropagation();
                      e.preventDefault();
                      return false;

                      });
            return false
          });

          $(".know_more").tap(function(){
            _this.page(7, _h);
          })
          return false
        });
        return false
      });




//关闭
      $(".close").tap(function(){
        $(".scaleTu2").removeClass("scaleTu2");
        $(".scaleTu,.clickTu").css("display","block");
        $(this).css("display","none");
        $(".pop-up,.pop-up-second").css("display","none");
        return false
      })



    })()


//处理选项卡
    ;$(function(){
      var len=0;
      var f=0;
      var cq=0;
      //用的是zepto点击事件
      $('.pannel_course_head img ').tap(function(){
        var t=$(this).index();
      var temp=  100/($(this).siblings().size()+1);
        $(this).parent().siblings().find("ul").css("width",11.75*($(this).siblings().size()+1)+"rem");
        f=-temp*t+"%";
        cq=100*t+"%";
        $(this).parent().siblings().find(".course_outline_ul").css({'-webkit-transform':'translate('+f+')','-webkit-transition':'500ms linear','transform':'translate('+f+')','transition':'500ms linear'} );
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      })

    })

        $(" .course_outline_ul .firstBigTu").swipeLeft(
            function(){
              var tempIndex = $(this).index();
            $(this).parents(".pannel_course_content").siblings(".pannel_course_head").find("img").eq(tempIndex+1).trigger("tap");
            }
        )
    $(" .course_outline_ul .firstBigTu").swipeRight(
        function(){
          var tempIndex = $(this).index();
          $(this).parents(".pannel_course_content").siblings(".pannel_course_head").find("img").eq(tempIndex-1).trigger("tap");
        }
    )






//处理预加载
    ;(function(){
      var l=0;
      var imgs;
      var sum=0;
      var imgs=new Array();
          var c= document.getElementById();
      /*var imgUrlBase="images/";*/
      var imgUrlArray= ['sec01-1.png','sec01-2.png','sec01-bg.png','sec02-1.png','sec02-2.png','sec02-3.png','sec02-4.png','sec02-bg.png','http://img.bss.csdn.net/201509281353116471.jpg','http://img.bss.csdn.net/201509251432298142.jpg'];
     /* var imgUrlArray= ['http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog1.png','http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog2.png','http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog3.png','http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog4.png','http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog5.png','http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog6.png','http://c.csdnimg.cn/jifen/images/xunzhang/jianzhang/blog7.png'];*/
      function chk(){
        l--;
        document.getElementById("prossNum").innerText=""+(Math.round((sum-l)*100/sum))+"%";

        document.getElementById("prossLineBar").style.width=""+(Math.round((sum-l)*100/sum))+"%";
        //setTimeout(function(){
          document.getElementById("sec01-2").style.left=""+((sum-l)*100/sum)+"%";
        //},500)

        if (l==0){
          for (var i=0;i<sum;i++)
          //绑定滑动事件哈
            _this.swipe(_h, _len);
          $("#swipe_tip_first").css("visibility","visible");
          //if(_w<_h){

          setTimeout(function(){
            _this.page(1, _h);
          },1000)
          //隐藏加载的条什么滴
          setTimeout(function(){
            $("#prossNumWarp,#prossLineBarWarp").remove();
          },1200)



        }
        //}
      }
      for(var j=0;j<imgUrlArray.length;j++){
        imgs[j]=new Image();
        //imgs[j].src=imgUrlBase+imgUrlArray[j]
        imgs[j].src=imgUrlArray[j]
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