function resRobot() {


	var startName = 'Linköping universitetet',
		startX = 15.577074442163966, 
	  	startY = 58.40192274735749,
	  	destName = 'Linköping resecentrum',
	  	destX = 15.625498,
	  	destY = 58.416178;

	if (window.XMLHttpRequest) 
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
	  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	// api-anrop för att testa i webbläsaren: https://api.trafiklab.se/samtrafiken/resrobot/Search.xml?key=PB02Hw9sJNchfZvj59hRR7jltro9CJT3&from=Linköping+universitetet&to=Mittresecentrum&fromX=15.577074442163966&fromY=58.40192274735749&toX=15.625498&toY=58.416178&coordSys=WGS84&apiVersion=2.1
	xmlhttp.open("GET","https://api.trafiklab.se/samtrafiken/resrobot/Search.xml?key=PB02Hw9sJNchfZvj59hRR7jltro9CJT3&from="+startName+"&to="+destName+"&fromX="+startX+"&fromY="+startY+"&toX="+destX+"&toY="+destY+"&coordSys=WGS84&apiVersion=2.1",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 


	var ttitems=xmlDoc.getElementsByTagName("ttitem");
	var departures=xmlDoc.getElementsByTagName("departure");
	var arrivals=xmlDoc.getElementsByTagName("arrival");
	var arrivalSegment = (getNumberOfSegments(0)-1);

	calculateTravelTime(0, arrivalSegment);
	getBusRides(0);

	// document.write("<table border='1'>");
	// document.write("<tr><td>");
	// document.write(" departure  ");  document.write("</td><td>");
	//    document.write(departures[0].getElementsByTagName("datetime")[0].childNodes[0].nodeValue);
	//    document.write("<tr><td>");

	// document.write(" arrival  "); document.write("</td><td>");
	//    document.write(arrivals[2].getElementsByTagName("datetime")[0].childNodes[0].nodeValue);
	// document.write("</table>");



	function calculateTravelTime(departureRoute, arrivalRoute)
	{
		var start = xmlDoc.getElementsByTagName("departure")[departureRoute].getElementsByTagName("datetime")[0].childNodes[0].nodeValue;
		var stop = xmlDoc.getElementsByTagName("arrival")[arrivalRoute].getElementsByTagName("datetime")[0].childNodes[0].nodeValue;
		startH = start.substring(11,13);
		startM = start.substring(14,16);
		stopH = stop.substring(11,13);
		stopM = stop.substring(14, 16);

		 //console.log("start = " + start);
		 //console.log("stop = " + stop);

		var h = stopH-startH;
		var m = stopM-startM;

		if(m<0){
			h = h-1;
			m = 60+m;
		}
		
		//console.log("vilket blir: " + h + " timmar och " + m + " minuter");
		return {h: h , m: m};
	}

	//returnera hur många delar resvägen "route" består av (tex: gång buss gång -> 3)
	function getNumberOfSegments(route)
	{
		return ttitems[route].getElementsByTagName("segment").length;
	}

	//returnera antal bussresor och  tid för bussresan i timmar och minuter
	function getBusRides(route){
		var busrides = 0;
		var hour = 0;
		var minutes = 0;
		var max = getNumberOfSegments(route);

		for (i=0; i<max; i++){
			var type = xmlDoc.getElementsByTagName("segmentid")[i].getElementsByTagName("mot")[0].childNodes[0].nodeValue;

			if(type == "Buss"){
				var tid =  calculateTravelTime(i, i);
				hour = hour + tid.h;
				minutes = minutes + tid.m;
				busrides++;

			}
		}
		//console.log("i getNumberOfBusRides, return=" + busrides);
		//console.log("i getNumberOfBusRides, tid: " + hour + ":" + minutes);
		return {counts: busrides, h: hour, min: minutes};
	}

}
