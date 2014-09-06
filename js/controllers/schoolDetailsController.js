schoolApp.controller("SchoolDetailsCtrl", function ($scope, $http, $routeParams){

	//$http.get("../../data/allschools.json") // funkar på felicia och jessicas dator
	$http.get("data/allschools.json") // funkar på emmas dator
        .then(function(results){
            console.log("Success!");
            //Success
            var data = results.data;
            //angular.copy(results.data, _schools); //this is the preferred; instead of $scope.movies = result.data
            for (var a = 0; a < data.length; a += 1) {
            	if (data[a].Skola == $routeParams.schoolName) {
            		$scope.selectedSchool = data[a];
            	}
            }
        }, function(results){
            //Error
        })

	var xml03 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr311.xml";
	var xml06 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr611.xml";
	var xml09 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr911.xml";

	var questionArray = [];
	var year2009 = 1;
	//var schoolName = "Bankekind";
	var schoolName =  $routeParams.schoolName;
	console.log(schoolName);
	var schoolID = 0;

	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	}
	else { // code for IE6, IE5
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("GET", xml03, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;

	var data = xmlDoc.getElementsByTagName("data")[0].childNodes[1].nodeValue;
	var new_data = data.split(" ");
	var questionField = xmlDoc.querySelectorAll("[axisId=axisvar1]");
	var questions = questionField[0].getElementsByTagName("value");
	for (i = 0;i < questions.length;i++) {
	    questionArray[i] = questions[i].getElementsByTagName("textlang")[0].childNodes[0].nodeValue;
	}

	var schoolField = xmlDoc.querySelectorAll("[axisId=axisvar3]");
	var schools = schoolField[0].getElementsByTagName("value");
	for (i = 0;i < schools.length;i++) {
	    if(schools[i].getElementsByTagName("textlang")[0].childNodes[0].nodeValue == schoolName) { // skolor
	        schoolID = i;
	        console.log(i);
	    }
	} 
	var questionNumber = 0;
	var data_id = 0;
	var qRow; 
	var nrOfRows = 0;
	for(i = 0; i < questionArray.length; i++)
	{
		if(i % 3 == 0){
			if(nrOfRows % 2 == 0){
				var qRow = d3.select("#QuestionSection")
					.append("div")
					.attr("class", "row lighter-data-row");
			}else{
				var qRow = d3.select("#QuestionSection")
					.append("div")
					.attr("class", "row darker-data-row");
			}
			nrOfRows = nrOfRows + 1;
		}
		
		
		data_id = (i*schools.length*3 + year2009*schools.length + schoolID);
		addQuestionElement(questionArray[i], new_data[data_id], qRow);
		
	}
	
	function addQuestionElement(question, data_value, qRow){
		var canvasWidth = 200, //width
	      canvasHeight = 200,   //height
	      outerRadius = 70,   //radius
	      color = d3.scale.ordinal()
	    	.domain(["foo", "bar", "baz"])
	    	.range(["#4cd9c0", "#ff8989", "#526e82"]);

	    var dataSet = [
	      {"magnitude": data_value},  
	      {"magnitude": (100 - data_value)}];

	    var qSection = qRow
	    	.append("div")
	    	.attr("class", "col-md-4");

	    var questionText = qSection
	    	.append("h4")
	    	.text(question);

	    var vis = qSection
	      	.append("svg:svg") //create the SVG element inside the <body>
	        .data([dataSet]) //associate our data with the document
	        .attr("width", canvasWidth) //set the width of the canvas
	        .attr("height", canvasHeight) //set the height of the canvas
	        .append("svg:g") //make a group to hold our pie chart
	         .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'

	    // This will create <path> elements for us using arc data...
	    var arc = d3.svg.arc()
	      .outerRadius(outerRadius);

	    var pie = d3.layout.pie() //this will create arc data for us given a list of values
	      .value(function(d) { return d.magnitude; }) // Binding each value to the pie
	      .sort( function(d) { return null; } );

	    // Select all <g> elements with class slice (there aren't any yet)
	    var arcs = vis.selectAll("g.slice")
	      // Associate the generated pie data (an array of arcs, each having startAngle,
	      // endAngle and value properties) 
	      .data(pie)
	      // This will create <g> elements for every "extra" data element that should be associated
	      // with a selection. The result is creating a <g> for every object in the data array
	      .enter()
	      // Create a group to hold each slice (we will have a <path> and a <text>
	      // element associated with each slice)
	      .append("svg:g")
	      .attr("class", "slice");    //allow us to style things in the slices (like text)

	    arcs.append("svg:path")
	      //set the color for each slice to be chosen from the color function defined above
	      .attr("fill", function(d, i) { return color(i); } )
	      //this creates the actual SVG path using the associated data (pie) with the arc drawing function
	      .attr("d", arc);

	}

    // Computes the angle of an arc, converting from radians to degrees.
    function angle(d) {
      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      return a > 90 ? a - 180 : a;
    }
    
});