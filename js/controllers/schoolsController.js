schoolApp.controller("SchoolsCtrl", ['$scope','$http', function($scope, $http) {    
            
            $http.get('../../data/allschools.json').success (function(data){
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
    
}]);