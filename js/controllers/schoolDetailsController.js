schoolApp.controller("SchoolDetailsCtrl", function ($scope, $http, $routeParams){

	//$http.get("../../data/allschools.json") // funkar på felicia och jessicas dator
	$http.get("data/allschools.json") // funkar på emmas dator
        .then(function(results){
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

    $scope.selectedSchool = $routeParams.schoolName;
    
});