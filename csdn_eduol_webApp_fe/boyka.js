var autoScaling=function(img,t,_width,_height){//boyka的图片自适应缩放,这个是静态缩放;
	if(img.width>0&&img.height>0){
		if(img.width/img.height>=_width/_height){
			if(img.width>_width){
				t.width(_width);
				t.height((img.height*_width)/img.width);          
			}else{
				t.width(img.width);
				t.height(img.height);
			}	
		}else{
			if(img.height>_height) {
				t.height(_height);
				t.width((img.width*_height)/img.height);
			}else{
				t.width(img.width);
				t.height(img.height);
			}
		}
	}
};
var Box=function(){
	this.init.apply(this,arguments);
};
Box.prototype={
	init:function(options){
		var _this=this;
		this.ele=options.ele;
		$(window).bind("load",function(){
			_this.ele.each(function(i){
				var img=new Image();
				img.src=$(this).attr("src");
				var _width=$(this).parent().width();
				var _height=$(this).parent().height();
				autoScaling(img,$(this),_width,_height);
				$(this).css({
					marginLeft:($(this).parent().width()-$(this).width())/2,
					marginTop:($(this).parent().height()-$(this).height())/2,
					visibility:"visible"
				})
			})
		})
	}
};
var Focus=function(){
	this.init.apply(this,arguments);
};
Focus.prototype={
	move:function(i){
		var _this=this;
		this.main.find(".btn a").eq(i).addClass("active").parent().siblings().find("a").removeClass("active");
		if(this.main.data("forward")){
			_this.main.find(".element").eq(i).css({
				left:_this.main.width()*(1)
			})
			_this.main.find(".scroll").animate({
				left:_this.main.width()*(-1)	
			},500,function(){
				_this.main.find(".scroll").css({
					left:0
				})
				_this.main.find(".element").eq(i).css({
					left:0
				}).addClass("current").siblings().removeClass("current");
			})
		}else{
			_this.main.find(".element").eq(i).css({
				left:_this.main.width()*(-1)
			})
			_this.main.find(".scroll").animate({
				left:_this.main.width()*(1)	
			},500,function(){
				_this.main.find(".scroll").css({
					left:0
				})
				_this.main.find(".element").eq(i).css({
					left:0
				}).addClass("current").siblings().removeClass("current");
			})	
		}
	},
	init:function(options){
		var _this=this;
		var i=0;
		var time=null;
		this.main=options.main;
		var auto=function(){
			i++;
			if(i>_this.main.find(".element").length-1){
				i=0;
			}
			_this.move(i);
		}
		$(window).bind("load",function(){
			_this.main.find(".btn").css({
				width:_this.main.find(".btn a").outerWidth(true)*_this.main.find(".btn a").length
			})
			_this.main.data("forward",true);
			time=setInterval(auto,5000);
		})
		_this.main.find(".btn a").bind("click",function(event){
			event.preventDefault();
			i=$(this).parent().index();
			var num=_this.main.find(".current").index();
			if(num>i){
				_this.main.data("forward",false);
			}else if(num<i){
				_this.main.data("forward",true);
			}
			_this.move(i);
		})
		_this.main.bind("mouseenter",function(event){
			event.preventDefault();
			if(time){
				clearInterval(time);
			}
		})
		_this.main.bind("mouseleave",function(event){
			event.preventDefault();
			if(time){
				_this.main.data("forward",true);
				time=setInterval(auto,5000);
			}
		})
	}
};
var Tab=function(){
	this.init.apply(this,arguments);
};
Tab.prototype={
	init:function(options){
		var _this=this;
		var num=0;
		this.main=options.main;
		this.main.find(".btn a").bind("mouseenter",function(event){
			event.preventDefault();
			var i=$(this).parent().index();
			return function(i){
				if(num==i){
					return;
				}else{
					_this.main.find(".btn a").eq(i).addClass("active");
					_this.main.find(".btn a").eq(num).removeClass("active");
					_this.main.find(".view").eq(i).addClass("visible");
					_this.main.find(".view").eq(num).removeClass("visible");
					num=i;
				}
			}(i)
		})
	}	
};
var Round=function(){
	this.init.apply(this,arguments);
};
Round.prototype={
	init:function(options){
		var _this=this;
		this.main=options.main;
		var num=0;
		var arr=[
			"#3c768e",
			"#9ac1c0",
			"#72421a",
			"#88ad79",
			"#f57a3e",
			"#9470b0",
			"#60cbef",
			"#d74343",
			"#9ac1c0",
			"#fec659",
			"#f57a3e",
			"#f6abcc"
		]
		$(window).bind("load",function(){
			var x=_this.main.width()/2-_this.main.find(".btn").width()/2;
			var y=_this.main.height()/2-_this.main.find(".btn").height()/2;
			var stard=0;
			var radius=365;
			var avd=360/_this.main.find(".btn").length;
			var ahd=avd*Math.PI/180;
			
			_this.main.find(".star").css({
				"left":(_this.main.width()-_this.main.find(".star").width())/2,
				"top":(_this.main.height()-_this.main.find(".star").height())/2
			});
			_this.main.find(".arrows").css({
				"left":(_this.main.width()-_this.main.find(".arrows").width())/2,
				"top":(_this.main.height()-_this.main.find(".arrows").height())/2
			});
			_this.main.find(".btn").each(function(index,element){
				$(this).css({
					"left":Math.sin((ahd*index))*radius+x,
					"top":Math.cos((ahd*index))*radius+y,
					"backgroundColor":arr[index]
				});
				/*$(this).bind("click",function(event){
					event.preventDefault();
					_this.main.find(".wrap").addClass("visible");
					if(index==num){
						return
					}else{
						_this.main.find(".view").eq(num).removeClass("visible");
						_this.main.find(".view").eq(index).addClass("visible");
						num=index;
					}
					
				})*/
			});
		})
		this.main.find(".close").bind("click",function(event){
			event.preventDefault();
			_this.main.find(".wrap").removeClass("visible");
		})
	}
};
(function(){
	new Box({
		ele:$(".box")
	})
	new Focus({
		main:$(".focus")	
	})
	new Tab({
		main:$(".tab")	
	})
	new Round({
		main:$(".round")	
	})
})()