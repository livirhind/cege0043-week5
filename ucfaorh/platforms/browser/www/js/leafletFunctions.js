var client;
var earthquakes;
var earthquakelayer;
var httpPortNumber = '30309';


var testMarkerRed= L.AwesomeMarkers.icon({
	icon:'play',
	markerColor: 'red'

});
var testMarkerPink = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});
// function that when called will add a point, line and polygon to the map 
function addPointLinePoly () {
 // add a point
        L.marker([51.5, -0.09]).addTo(mymap).bindPopup("<b> Hello world!</b><br/>I am a popup.").openPopup();
        // add a circle
        L.circle([51.508, -0.11], 500, {
        	color: 'red', 
        	fillColor: '#f03',
        	fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
        // add a polygon with 3 end points 
        var myPolygon = L.polygon([
        	[51.509, -0.08],
        	[51.503, -0.06],
        	[51.51, -0.047]
        	],{
        		color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5
			}).addTo(mymap).bindPopup("I am a triangle.");


    }
 //create the code to get the Earthquakes data using an XMLHttpRequest
	function getFormData(){
		alert('Getting the form data')
		client = new XMLHttpRequest();
		client.open('GET', 'http://developer.cege.ucl.ac.uk:'+httpPortNumber+'/getFormData/'+httpPortNumber,true);
        client.onreadystatechange = earthquakeResponse; // note don't use earthquakeResponse() withh brackets as that doesn't work 
        client.send();
	}
	// create the code to wait for the response from the data server, and process once it is received 
	function earthquakeResponse(){
		//this function listens for the server to say that the data is ready 
		if (client.readyState == 4){
			//once the data is ready, process the data
			var earthquakedata = client.responseText;
			loadEarthquakelayer(earthquakedata);
		}
	}
	// convert the received data - which is text to JSON format and add it to the map 
function loadEarthquakelayer(earthquakedata){
	//convert the text to JSON
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakes = earthquakejson
	// add the JSON layer onto the map - it will appear using the default icons
	earthquakelayer = L.geoJSON(earthquakejson,
		{ 
			pointToLayer: function(feature, latlng)
			{
				if(feature.properties.mag > 1.75){
					return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place+"</b>");
				}
				else {
					return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place+"</b>");;
				}
			},

		}).addTo(mymap);
	//change the map zoom so that all the data is shown
	mymap.fitBounds(earthquakelayer.getBounds());
}