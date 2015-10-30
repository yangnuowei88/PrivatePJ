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
        w: document.documentElement.clientWidth || document.body.clientWidth,
        h: document.documentElement.clientHeight || document.body.clientHeight
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
function insertTag(targetT, parent) {
    var htmlStr = targetT.cloneNode(true);
    parent.appendChild(htmlStr);
}
function fnTab() {
    var oTab = id("tabPic");
    var oList = id("picList");
    var aNav = oTab.getElementsByTagName("nav")[0].children;
    var iNow = 0;
    var iX = 0;
    var iW = view().w;
    var oTimer = 0;
    var iStartTouchX = 0;
    var iStartX = 0;
    var moveFlag = true;
    var iDis = 0;
    insertTag(oList.children[0], oList);
    bind(oTab, "touchstart", fnStart);
    bind(oTab, "touchmove", fnMove);
    bind(oTab, "touchend", fnEnd);
    auto();
    function auto() {
        oTimer = setInterval(function () {
            iNow++;
            //iNow=iNow%aNav.length+1;
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

        iDis = ev.pageX - iStartTouchX;
        //iDis往左滑是负数，右滑是正数
        if (iDis > 0 && iNow == 0 && moveFlag) {
            var valX = -aNav.length * iW;
            oList.style.webkitTransition = oList.style.transition = "0s";
            oList.style.WebkitTransform = oList.style.transform = "translateX(" + valX + "px)";
            oList.style.webkitTranstion = oList.style.transtion = "0.5s";
            iStartX = valX;
        }
        iX = iStartX + iDis;
        oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";
        moveFlag = false;
    }

    function fnEnd() {
        moveFlag = true;

        console.log(iDis);
        if (iNow != 4 && iDis < -20) {
            iNow++

        }
        else if (iNow != 0 && iDis > 20) {

            iNow--
        }
        else if (iNow == 0 && Math.abs(iDis) > 20) {

            iNow = aNav.length - 1;
        }
        else if (iNow == 4 && Math.abs(iDis) > 20) {
            iNow = aNav.length;
        }
        else {
           // return true;
        }
        tab();
        auto();
    }

    function tab() {
        iX = -iNow * iW;
        oList.style.transition = "0.5s";
        oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";
        if (iNow === aNav.length) {
            iNow = 0;
            iX = 0;
            //目的是要等那个过渡完毕了才去弄
            setTimeout(function () {
                oList.style.webkitTransition = oList.style.transition = "0s";
                oList.style.WebkitTransform = oList.style.transform = "translateX(0px)";
                oList.style.webkitTranstion = oList.style.transtion = "0.5s";
            }, 500);
        }
        for (var i = 0; i < aNav.length; i++) {
            removeClass(aNav[i], "active");
        }
        addClass(aNav[iNow], "active");
    }
}
//为轮播图设置宽度
function setWidth() {
    var oTab = id("tabPic"), oList = id("picList"), w = view().w, oLi = oList.getElementsByTagName("li");
    oList.style.width = w * oLi.length + "px";
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.width = w + "px";
    }

}
fnTab();
setWidth();
//直接在此调用
