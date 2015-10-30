
/*$(function(){

    var $pop_search_bt = $(".pop_search_bt");
    var $pop_header_bt = $(".pop_header_bt");
    var $pop_mark = $(".pop_mark");
    var $header_search_pop = $(".header_search_pop");
    var $header_second_nav_pop = $(".header_second_nav_pop");
      *//*  var  beforeFn = function(){

           $pop_mark.add($header_search_pop).add($header_second_nav_pop).addClass("edu_hidden")
       }*//*
    $pop_search_bt.add($pop_header_bt).tap(function(e){
       *//* if (beforeFn instanceof Function){
            beforeFn();
        }*//*

        if(this=== $pop_search_bt[0]){
            $header_search_pop.add( $pop_mark).toggleClass("edu_hidden");
            //$header_second_nav_pop.addClass("edu_hidden");
        }
        else{
            $header_second_nav_pop.add( $pop_mark).toggleClass("edu_hidden");
            //$header_search_pop.addClass("edu_hidden");
        }
        return false
    })
    $(body).tap(function(e){
        $header_search_pop.add($header_second_nav_pop).add( $pop_mark).addClass("edu_hidden");
    })
})*/
$(function(){
    //让状态栏消失
   /* if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
     bodyTag = document.getElementsByTagName('body')[0];
     bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
     }
     setTimeout(function() {
     window.scrollTo(0, 1)
     }, 0);*/
 var $pop_search_bt = $(".pop_search_bt");
 var $pop_header_bt = $(".pop_header_bt");
 var $pop_mark = $(".pop_mark");
 var $header_search_pop = $(".header_search_pop");
 var $header_second_nav_pop = $(".header_second_nav_pop");
 var  $header_search_pop_flag=false;//确定2个弹层的状态
 var   $header_second_nav_pop_flag=false;
 $pop_search_bt.add($pop_header_bt).tap(function(){
 //点击搜索
 if(this=== $pop_search_bt[0]){
 //$header_second_nav_pop.add( $pop_mark).addClass("edu_hidden");
 //点击搜索的时候导航是开的
 if($header_second_nav_pop_flag){
 // $header_search_pop.add( $pop_mark).toggleClass("edu_hidden");
 $header_search_pop.removeClass("edu_hidden");
 $pop_mark.removeClass("edu_hidden");
 $header_search_pop_flag=true;
 $header_second_nav_pop.addClass("edu_hidden")
 $header_second_nav_pop_flag=false;
 }
 else{
 //点击搜索按钮(搜索弹窗可能是开，也可能是关)
 $header_search_pop.add( $pop_mark).toggleClass("edu_hidden");
 if( $header_search_pop.hasClass("edu_hidden")){
 $header_search_pop_flag=false;
 }else{
 $header_search_pop_flag=true;
 }
 $header_second_nav_pop.addClass("edu_hidden")
 $header_second_nav_pop_flag=false;
 }
 }


 //点击导航按钮
 else{
 //$header_search_pop.add( $pop_mark).addClass("edu_hidden");
 //点击导航的时候搜索是开的
 if($header_search_pop_flag){
 // $header_second_nav_pop.add( $pop_mark).toggleClass("edu_hidden");

     $header_second_nav_pop.removeClass("edu_hidden");
 $pop_mark.removeClass("edu_hidden");

 $header_second_nav_pop_flag=true;
 $header_search_pop.addClass("edu_hidden")
 $header_search_pop_flag=false;
 }
 else{
 //点击二级导航按钮(二级导航弹窗可能是开，也可能是关)
 $header_second_nav_pop.add( $pop_mark).toggleClass("edu_hidden");
 if(  $header_second_nav_pop.hasClass("edu_hidden")){
 $header_second_nav_pop_flag=false;
 }
 else{
 $header_second_nav_pop_flag=true;
 }
 $header_search_pop.addClass("edu_hidden")
 $header_search_pop_flag=false;
 }
 }
 return false
 })
//点击非弹窗内容处关闭弹出层
 $(body).tap(function(e){

     if($(e.target).parents(".header_second_nav_pop,.header_search_pop").length>0){
         return false
     }
 $header_search_pop.add($header_second_nav_pop).add( $pop_mark).addClass("edu_hidden");
 })
//往上滚动会隐藏nav
    //zeptp swipe在微信上不好使
   /* $('.main').swipeUp(function(){
     alert(1);
     })*/
           var main = new Hammer($(".main")[0]);
           var main = new Hammer(document.getElementsByClassName("main")[0]);
            //添加事件
            var  header_height=$("#header").height();
            var  main_height=$(".main").height();
           // 安卓上出现了不灵活的现象
           main.on("panup", function (e) {
                  $("#header").css("display","none");
                    $(".main").css("top",0);

                    //alert("up");
                    return false
                });
            main.on("pandown", function (e) {
                $("#header").css("display","inline-block");
                $(".main").css("top","2.2rem");
                //alert("down");
                return false
            });
    //用滚动条解决太突兀
    /*    var $main= $(".main");
      var $mainScrollTopFrist=$main.scrollTop();
      var $mainScrollTopLast=0;
        $(".main").bind("scroll", function(){
        //当滚动条滚动时
            $mainScrollTopLast=$main.scrollTop();
            if($mainScrollTopFrist-$mainScrollTopLast<0){
                //console.log("上滚了")
                $("#header").css("display","none");
                $(".main").css("top",0);
            }
            else{
                //console.log("xia滚了")
                $("#header").css("display","inline-block");
                $(".main").css("top","2.2rem");
            }
        });*/


})
