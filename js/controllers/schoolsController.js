schoolApp.controller("SchoolsCtrl", function ($scope, schoolsService, $routeParams){
    //Executes when the controller is created
    $scope.schools = schoolsService.schools;

    schoolsService.getSchools();

    $scope.selectedSchool = $routeParams.schoolName;
    
});