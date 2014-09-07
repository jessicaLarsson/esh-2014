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
    
});