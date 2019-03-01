function loadW3HTML() {
	w3.includeHTML();
}


function startup() {
	document.addEventListener('DOMContentLoaded', function(){
		zoomOnMap();
	},false)
	document.addEventListener('DOMContentLoaded', function(){
		trackAndCircle();
	},false);
}


