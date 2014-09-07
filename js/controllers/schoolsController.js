
schoolApp.controller("SchoolsCtrl", ['$scope','$http','$location', function($scope, $http, $location) {    
            
        $http.get('data/allschools.json').success (function(data){
                $scope.schools = data;
                $scope.schools.dis = "hej";

        	});


    //resRobot variabler
    $scope.travelTimeH = 0;
    $scope.travelTimeM = "hej";

    //map variabler
    $scope.distances = [];

    $scope.getTravelTime = function(index){
    	//console.log("i getTravelTime" + index);
    	$scope.travelTimeM = "5 min med cykel";
    	
    }

    $scope.getDistance = function(lat, lon, name){
    	$scope.distances.push(mapFunction.addSchoolMarker(lat, lon, name));
 
    }

    //compare methods
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

    $scope.schoolTypes = [];

    $scope.typeFilter = function(school){
      if ($scope.schoolTypes.length > 0) {
            if ($.inArray(school.Kommunal, $scope.schoolTypes) < 0)
                return;
        }
        
        return school;
      }

    $scope.includeType = function(type) {
      var i = $.inArray(type, $scope.schoolTypes);
        if (i > -1) {
            $scope.schoolTypes.splice(i, 1);
        } else {
            $scope.schoolTypes.push(type);
        }
    }

    
}]);

