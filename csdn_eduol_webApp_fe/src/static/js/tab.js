
$(function(){
    var len=0;
    var f=0;
    var cq=0;
    $(".pannel_tab .pannel_course_warp").height( $(".pannel_tab .pannel_course_warp .pannel_course").eq(0).height());
    //用的是zepto点击事件
   $('.pannel_tab_head span').tap(function(){
     var t=$(this).index();
     var current_height=  $(this).parents('.pannel_tab').find('.pannel_course_warp .pannel_course').eq(t).height();
       $(this).parents('.pannel_tab').find('.pannel_course_warp ').height(current_height);
     //var wh=$('.line').width();
     f=-20*t+"%";
     cq=100*t+"%";

     $(this).parents('.pannel_tab').find('.pannel_course_warp').css({'-webkit-transform':'translate('+f+')','-webkit-transition':'500ms linear','transform':'translate('+f+')','transition':'500ms linear'} );
     $(this).siblings().removeClass('active');
     $(this).addClass('active');
     })
//由于原始的hammer需要传入dom,而且不能默认遍历，现在我们引入一个插件解决这个问题。(那个插件也不能遍历,所以还是决定不用插件)
    $.each($('.pannel_course'),function(index,value){
        var that=this;
        //hammer只能是传入单个的dom对象，jq对象不行，而且也没有默认的遍历。
        (new Hammer(value)).on("swipeleft", function (e) {
            var i=$(that).index()+1;
            len=-20*i+"%";
            //cq=100*i+"%";
            if(i==5){return false}
            else{
                $(that).parents('.pannel_tab').find('.pannel_course_warp ').height($(that).next().height());
                $(that).parent('.pannel_course_warp').css({'-webkit-transform':'translate('+len+')','-webkit-transition':'500ms linear','transform':'translate('+len+')','transition':'500ms linear'} );
                $(that).parents('.pannel_tab').find('.pannel_tab_head span').eq(i).siblings().removeClass('active');
                $(that).parents('.pannel_tab').find('.pannel_tab_head span').eq(i).addClass('active');
            }
        });
    })

//这个就是dom问题，同上面
    $.each($('.pannel_course'),function(index,value){
        var that=this;
        (new Hammer(value)).on("swiperight", function (e) {
            var i=$(that).index();
            if(i==0){return false}
            else{
                var n=i-1;
                len=-20*n+"%";
                //cq=100*n+"%";

                $(that).parents('.pannel_tab').find('.pannel_course_warp ').height($(that).prev().height());
                $(that).parents('.pannel_tab').find('.pannel_course_warp').css({'-webkit-transform':'translate('+len+')','-webkit-transition':'500ms linear','transform':'translate('+len+')','transition':'500ms linear'} );
                $(that).parents('.pannel_tab').find('.pannel_tab_head span').eq(i-1).siblings().removeClass('active');
                $(that).parents('.pannel_tab').find('.pannel_tab_head span').eq(i-1).addClass('active');
            }
        })
        });

})


