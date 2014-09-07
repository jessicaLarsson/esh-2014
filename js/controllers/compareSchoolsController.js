schoolApp.controller("CompareSchoolsCtrl", function ($scope, $http, $routeParams){

	var string = $routeParams.selection;
	$scope.selection = string.split(',');

	$scope.selectedSchools = [];

	//$http.get("../../data/allschools.json") // funkar på felicia och jessicas dator
	$http.get("data/allschools.json") // funkar på emmas dator
        .then(function(results){
            console.log("Success!");
            //Success
            var data = results.data;
			for (var a = 0; a < $scope.selection.length; a += 1) {
            	for (var b = 0; b < data.length; b += 1) {
            		if (data[b].Skola == $scope.selection[a]) {
            			$scope.selectedSchools.push(data[b]);
            		}
            	}
            }

        }, function(results){
            //Error
        })

    var header = d3.select("#compareHeader");
    for(i = 0; i < $scope.selection.length; i++)
    {
       console.log($scope.selection[i]); 
       header.append("div")
       .attr("class", "col-md-"+(12/$scope.selection.length))
       .append("h2")
       .text($scope.selection[i]);

    }

    var xml03 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr311.xml";
    var xml06 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr611.xml";
    var xml09 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr911.xml";

    var questionArray = [];
    var year2009 = 1;
    var schoolID = [];

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
        for(j = 0; j < $scope.selection.length; j++)
        {
            if(schools[i].getElementsByTagName("textlang")[0].childNodes[0].nodeValue ==  $scope.selection[j]) { // skolor
                schoolID.push(i);
                console.log("skol-id: " + i);
            }
        }
    } 
   
   var qSection;
    var questionNumber = 0;
    var data_id = 0;
    var qSection; 
    var nrOfRows = 0;
    console.log(questionArray.length);


    for(i = 0; i < questionArray.length; i++)
    {
         console.log(questionArray.length);
        if(i == 7 || i ==  8 || i == 11 || i == 0){
            qSection = d3.select("#teacher-data");
        }else if(i == 3 || i ==  4 || i == 5 || i == 6){
            qSection = d3.select("#safety-data");
        }else if(i == 1 || i == 2 || i ==  9 || i == 10){
            qSection = d3.select("#study-data");
        }else{
            qSection = d3.select("#food-data");
        }

        console.log("lentgh: " + schoolID.length);

        addBarChart(qSection, questionArray[i], schoolID, $scope.selection);
        
    }

    function addBarChart(qSection, question, schoolIDs, schoolNames){
         var data = [4, 8, 15, 16, 23, 42];

         
         data_id = (i*schools.length*3 + year2009*schools.length + schoolID);

        var color = d3.scale.ordinal()
            .domain(["foo", "bar", "baz"])
            .range(["#4cd9c0", "#ff8989", "#526e82"]);

        var chart = qSection
            .append("div")
            .attr("class", "col-md-3" )
            .append("svg:svg")
            .attr("class", "chart")
            .attr("width", 220)
            .attr("height", 20 * data.length);

        var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 220]);

        chart.selectAll("rect")
            .data(data)
            .enter().append("svg:rect")
            .attr("y", function(d, i) { return i * 20; })
            .attr("width", x)
            .attr("height", 20);
     
         var y = d3.scale.ordinal()
             .domain(data)
             .rangeBands([0, 120]);


        chart.selectAll("rect")
            .data(data)
            .enter().append("svg:rect")
            .attr("y", y)
            .attr("width", x)
            .attr("height", y.rangeBand());

        chart.selectAll("text")
            .data(data)
            .enter().append("svg:text")
            .attr("x", x)
            .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
            .attr("dx", -3) // padding-right
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "end") // text-align: right
            .attr("fill", "white")
            .text(String);

    }

    
});