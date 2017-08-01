document.addEventListener("touchstart",function(e){
	e.preventDefault();
});
/*3d适配*/
(function(){
	var wrap = document.querySelector(".wrap");
	var view = document.querySelector(".view");
	var boxZ = document.querySelector(".boxZ");
	var deg = 52.5;
	var R = Math.round(Math.tan(deg*Math.PI/180)*(wrap.clientHeight/2)); //角度所在的景深距离
	wrap.style.perspective = wrap.style.WebkitPerspective = R + "px";
	css(view,"translateZ",R); 
	css(boxZ,"translateZ",-150); 
})();
/*生产布局*/
(function(){
	var box = document.querySelector(".box");
	var imgW = 129;
	var length = 20;
	var deg = 360/length;   //每个图片的外角
	var D = (180-deg)/2;		//夹角
	var R = Math.tan(D*Math.PI/180)*imgW/2; 
	//正切： 直角三角形对边比邻边的比值
	var inner = "";
	for (var i = 0; i < length; i++) {
		inner += '<span style="opacity:0;background:url(img/'+(i+1)+'.png);-webkit-transform:rotateY('+(-i*deg)+'deg) translateZ('+(-R)+'px)"></span>';
	}
	box.innerHTML = inner;
})();
/*入场动画*/
(function(){
	var secBj = document.querySelector(".secBj");
	var box = document.querySelector(".box");
	var spans = box.querySelectorAll("span");
	var boxZ = document.querySelector(".boxZ");
	css(box,"rotateX",0);
	css(box,"rotateY",-792);
	css(boxZ,"translateZ",-3000);
	var timer = 0;
	var now = 0;
	startMove({
		el: boxZ,
		target: {
			translateZ: -150
		},
		time: 5000,
		type: "easeOut"
	});
	startMove({
		el: box,
		target: {
			rotateY: 25
		},
		time: 5000,
		type: "easeOut",
		callBack: function(){
			startMove({
				el: secBj,
				target: {
					opacity: 100
				},
				time: 1000,
				type: "easeOutStrong"
			})
		}
	});
	timer = setInterval(function(){
		css(spans[now],"opacity",100);
		now++;
		if (now >= spans.length) {
			clearInterval(timer)
			setRotate()
		}
	},30)
})();

/*添加旋转*/
function setRotate(){
	var wrap = document.querySelector(".wrap");
	var box = document.querySelector(".box");
	var startPoint = {};
	var startDeg = {};
	var scale = {x:90/wrap.clientWidth,y:30/wrap.clientHeight};//移动一个屏幕应该多少度
	wrap.addEventListener("touchstart",function(e){
		var touch = e.changedTouches[0];
		startPoint = {x: touch.pageX,y: touch.pageY};
		startDeg = {x: css(box,"rotateX"),y: css(box,"rotateY")}
		console.log(startDeg.y);
	});
	wrap.addEventListener("touchmove",function(e){
		var touch = e.changedTouches[0];
		var nowPoint = {x: touch.pageX,y: touch.pageY};
		var dis = {x: startPoint.x-nowPoint.x ,y: nowPoint.y - startPoint.y};
		var disDeg = {x: dis.x*scale.x,y: dis.y*scale.y};
		var Rotate = {x: disDeg.x + startDeg.y,y: dis.y + startDeg.x};
//		console.log(disDeg.x,startDeg.y)
		css(box,"rotateX",Rotate.y);
		css(box,"rotateY",Rotate.x);
	});
	wrap.addEventListener("touchend",function(){
//		return
	})
}