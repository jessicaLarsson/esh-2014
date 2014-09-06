// schoolApp.controller("SchoolsCtrl", function ($scope, schoolsService){
//     //Executes when the controller is created
//     $scope.schools = schoolsService.schools;

//     //reRobot variabler
//     $scope.travelTimeH = 0;
//     $scope.travelTimeM = "hej";

//     //map variabler
//     $scope.distances = [];
//     //$scope.distance = "d";

//     $scope.getTravelTime = function(index){
//     	//console.log("i getTravelTime" + index);
//     	$scope.travelTimeM = "muahaha";
    	
//     }

//     $scope.getDistance = function(lat, lon){
//     	//console.log("i getDistance: " + lat + lon);
//     	$scope.distances.push(mapFunction.addSchoolMarker(lat, lon));
//     	//$scope.distance = mapFunction.addSchoolMarker(lat, lon);
//     	//var dist = mapFunction.getDistance(lat, lon);
//     	//$scope.distance = dist.toString();

//     	//console.log("distance = " + $scope.distance);
   
//     }

//     $scope.returnDistance = function(){

//     }
    

//     schoolsService.getSchools();
// });



 

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