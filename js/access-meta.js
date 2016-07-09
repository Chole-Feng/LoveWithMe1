function reset() {
	var scale = 1 / window.devicePixelRatio;
	document.write('<meta name="viewport" content="width=device-width,initial-scale=' + scale + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',user-scalable=no" />')
	var width = document.documentElement.clientWidth / 16;
	var ohtml = document.getElementsByTagName("html")[0];
	ohtml.style.fontSize = width + "px";
}
reset();