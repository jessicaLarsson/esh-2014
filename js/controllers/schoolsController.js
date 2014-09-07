
schoolApp.controller("SchoolsCtrl", ['$scope','$http','$location', function($scope, $http, $location) {    
            
        $http.get('data/allschools.json').success (function(data){
                $scope.schools = data;
                $scope.schools.dis = "hej";

        	});


    //reRobot variabler
    $scope.travelTimeH = 0;
    $scope.travelTimeM = "hej";

    //map variabler
    $scope.distances = [];
    //$scope.distance = "d";

    $scope.getTravelTime = function(index){
    	//console.log("i getTravelTime" + index);
    	$scope.travelTimeM = "muahaha";
    	
    }

    $scope.getDistance = function(lat, lon, name){
    	$scope.distances.push(mapFunction.addSchoolMarker(lat, lon, name));
 
    }

    $scope.returnDistance = function(){

    }

    $scope.selection = [];
    // toggle selection for a given school by name
  	$scope.toggleSelection = function toggleSelection(schoolName) {
  		var idx = $scope.selection.indexOf(schoolName);
     	// is currently selected
	    if (idx > -1) {
	    	$scope.selection.splice(idx, 1);
	    }
	    // is newly selected
     	else {
       		$scope.selection.push(schoolName);
     	}
   	};

   	$scope.compare = function compare(selection) {
   		var path = '/jamfor/';
   		$location.path(path+selection);
   	}
    
}]);

