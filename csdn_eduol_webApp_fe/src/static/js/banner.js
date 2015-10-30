/**
 * Created by yangwei1 on 2015/6/17.
 */
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function () {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
(function () {
    var oTab = id("tabPic");
    var oList = id("picList");
    //其实只用拷贝最后一个元素就OK，不用四个都给拷贝
    oList.innerHTML += oList.innerHTML;
    var aNav = oTab.getElementsByTagName("nav")[0].children;
    var iNow = 0;//当前播放到哪个图片了
    var iX = 0;//每次tab前都需要计算下那个tranform值是多少了，然后每次触摸的时候也需要这个数，负值给了iStartX
    var iW = view().w;//屏幕的宽度
    var oTimer = 0;//公共的定时器
    var iStartTouchX = 0;//开始触摸的相当视口的一个值，实际是需要加入iStartX
    var iStartX = 0;//每次触摸的iX值
    var iDis=0;
    bind(oTab, "touchstart", fnStart);
    bind(oTab, "touchmove", fnMove);
    bind(oTab, "touchend", fnEnd);
    auto();
    function auto() {
        oTimer = setInterval(function () {
            iNow++;
            iNow = iNow % (aNav.length+1);
            tab();
        }, 2000);
    }

    function fnStart(ev) {
        oList.style.transition = "none";
        ev = ev.changedTouches[0];
        iStartTouchX = ev.pageX;
        iStartX = iX;
        clearInterval(oTimer);
    }

    function fnMove(ev) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        //iDis往左滑是负数，右滑是正数
        iDis = ev.pageX - iStartTouchX;
        if(iNow==0&& iDis>0){

            oList.style.WebkitTransition = oList.style.transition = "0s";
            oList.style.WebkitTransform = oList.style.transform = "translateX("+(-iW*4+iDis)+"px)";
            //iNow=4;

        }

        iX = iStartX + iDis;
        oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";
    }

    function fnEnd() {
        //iNow = iX / iW;
        //以前其实整个滑动到哪里只与iNow有关系，她这里采取了一个四舍五入的，就是如果你没有滑动的超过一半的距离就不会动的，因为iNow没有变
        //iNow = -Math.round(iNow);
        //现在是这样
    //如果左右拖动距离小于20就不动
        if(Math.abs(iDis)<20){
            //alert(1)
        }
        else if(iDis>=20) {
            iNow--;
            if(iNow<0){
                iNow=aNav.length-1;
            }
        }
        else{
        iNow++;
        }

        //到边界后弹出第一个往右，左边漏出
        if (iNow < 0) {

            iNow = 4;
        }
        //到边界后弹出第一个往左，右边漏出
        if (iNow > aNav.length - 1) {
            iNow = aNav.length - 1;
        }
        tab();
        auto();
    }

    function tab() {
        console.log(iNow)
        if (iNow == 4) {

            iX = -iNow * iW;
            oList.style.transition = "0.5s";
            oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";

            //由于transition是一个异步事件，所以呢，你如果知道了过度的时间，用个定时器去做也是一样的，冯建俊用的这个。
            function myBlind(){
                oList.style.WebkitTransition = oList.style.transition = "0s";
                oList.style.WebkitTransform = oList.style.transform = "translateX(0px)";
                iNow = 0;
                addClass(aNav[0], "active");
                //解除事件的时候需要注意了，必须指定相同的事件名字
                oList.removeEventListener("webkitTransitionEnd",myBlind);
            }
            oList.addEventListener("webkitTransitionEnd",myBlind );



            // 标准语法
            //document.getElementById("myDIV").addEventListener("transitionend", myFunction);

        }
        else {
            iX = -iNow * iW;
            oList.style.transition = "0.5s";
            oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";
        }

       for (var i = 0; i < aNav.length; i++) {
            removeClass(aNav[i], "active");
        }
        addClass(aNav[iNow], "active");
    }
})()
//直接在此调用
// fnTab()