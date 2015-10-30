/**
 * Created by fwytech on 14-1-24.
 */

function  Hello(){
   alert("hello");
}

function TestArray1(){
    var arr = new Array();
    arr.push("aaa");
    arr.push("bbb");
    var len = arr.length;
    alert(len);
}

function TestArray2(){
    var arr = new Array();
    arr["push"]("aaa");
    arr["push"]("bbb");
    var len = arr["length"];
    alert(len);
}

function Test3(){
    var obj = new Object();
    obj["My Test"]="hello myTest2";
    alert(obj[["My Test"]]);

}

