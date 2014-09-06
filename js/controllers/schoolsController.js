schoolApp.controller("SchoolsCtrl", function ($scope, schoolsService, $location){
    //Executes when the controller is created
    $scope.schools = schoolsService.schools;

    schoolsService.getSchools();

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
   		console.log(selection);
   		var path = '/jamfor/';
   		$location.path(path+selection);
   	}
});