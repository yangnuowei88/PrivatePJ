/**
 * Created by yangwei1 on 2015/6/16.
 */
//调整字体
function initpage()
{
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
    //var view_height = document.getElementsByTagName('html')[0].getBoundingClientRect().height;
    var view_height = $("body").height();
    var _html = document.getElementsByTagName('html')[0];
    view_width>640?_html.style.fontSize=640/16 +'px':_html.style.fontSize =view_width/16+'px';
   ;
    var haederH = $('#header').height();
    var footerH = $('#footer').height();
    //现在不需要去计算
    //$('.main').css('height',(view_height-haederH-footerH));

}
////隐藏导航栏
//function hideAddressBar_ios(){
//    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
//        bodyTag = document.getElementsByTagName('body')[0];
//        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
//    }
//    setTimeout(function(){
//        window.scrollTo(0, 1);
//    }, 100);
//};
//function hideAddressBar_android(){
//    var n = navigator.userAgent;
//    if(n.match(/UCBrowser/i)){
//        //uc浏览器
//        hideAddressBar_ios();
//        return false;
//    }
//    var self = document.getElementsByTagName('body')[0];
//    if (self.requestFullscreen) {
//        self.requestFullscreen();
//    } else if (self.mozRequestFullScreen) {
//        self.mozRequestFullScreen();
//    } else if (self.webkitRequestFullScreen) {
//        self.webkitRequestFullScreen();
//    }
//};
//window.addEventListener("load",function(){
//    navigator.userAgent.match(/Android/i) ? hideAddressBar_android() : hideAddressBar_ios();
//});