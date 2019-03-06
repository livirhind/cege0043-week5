function startDataUpload(){
	
	//receive the text box values
	var name= document.getElementById("name").value;
	var surname= document.getElementById("surname").value;
	var modulecode= document.getElementById("module").value;
	//put values in postring to send to the server
	var postString="name="+name +"&surname="+surname+"&module="+modulecode;
	//managing the select button, checkbox and radio buttons 
	var checkString = "";
	for (var i = 1; i<5;i++){
		if (document.getElementById("check"+i).checked === true){
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}
	}
	postString = postString + "&modulelist="+checkString;
	//now get the radio button values
	if (document.getElementById("morning").checked){
		postString=postString+"&lecturetime=morning";
	}
	if (document.getElementById("afternoon").checked){
		postString=postString+"&lecturetime=afternoon";
	}
    //now get the geometry values
    var latitude =document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;

	//now get the select box values
	var language = document.getElementById("languageselectbox").value;
	postString = postString + "&language=" +language;
	
	alert(postString);
	//calling the processing function
	processData(postString);
}

var client; //the global variable that holds the request
function processData(postString) {
    client = new XMLHttpRequest() ;
    postString=postString + "&port_id=" + httpPortNumber;
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadData";
    client.open('POST',url,true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUpload;
    //send the post string
    client.send(postString);
}

//create the code to wait for the response from the data server, and process the response once it is received
function dataUpload() {
	//function listens out for the server to say that the data is ready
	if (client.readyState == 4){
		//change the DIV to show the response
		document.getElementById("dataUploadResult").innerHTML= client.responseText;
	}
}