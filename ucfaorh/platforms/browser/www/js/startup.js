function trackAndCircle () {
         trackLocation();
	     addPointLinePoly();
	     getEarthquakes();
         }




function startup() {
	document.addEventListener('DOMContentLoaded', function(){
		zoomOnMap();
	},false)
	document.addEventListener('DOMContentLoaded', function(){
		trackAndCircle();
	},false);
}


