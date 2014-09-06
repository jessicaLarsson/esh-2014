schoolApp.controller("SchoolsCtrl", function ($scope, schoolsService){
    //Executes when the controller is created
    $scope.schools = schoolsService.schools;

    schoolsService.getSchools();
});