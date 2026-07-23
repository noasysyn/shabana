function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");

		for(var i=0; i < images.length; i++) {
			if(images[i].getAttribute("src").match("_off.")){
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
				}
			}
		}
	}
}




function HighLight(){
	

	lnimg = target + "img"
	
	if(target == "") {
		return;
	} else {
		document.getElementById(lnimg).setAttribute("src", document.getElementById(lnimg).getAttribute("src").replace("_off.", "_on."));
		document.getElementById(lnimg).onmouseout = function() {
			document.getElementById(lnimg).setAttribute("src", document.getElementById(lnimg).getAttribute("src").replace("_off.", "_on."));
		}

	}
}



if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
	window.addEventListener("load", HighLight, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
	window.attachEvent("onload", HighLight);
}

$(function(){
   // #で始まるアンカーをクリックした場合に処理
   $('a[href^=#]').click(function() {
      // スクロールの速度
      var speed = 400;// ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      $($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});