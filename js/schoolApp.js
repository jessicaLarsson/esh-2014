var schoolApp = angular.module("schoolApp", []);
var mapFunction = new mapFile();
//...configuring and routing

schoolApp.config(function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when("/",{
            controller: "SchoolsCtrl",
            templateUrl: "js/views/schoolsListView.html"
        })
        .when("/:schoolName",{
        	controller:"SchoolDetailsCtrl",
        	templateUrl: "js/views/singleSchoolView.html"
        })
        .when("/jamfor/:selection",{
            controller:"CompareSchoolsCtrl",
            templateUrl: "js/views/compareSchoolsView.html"
        });
 
    $routeProvider.otherwise({"redirectTo": "/"});  //.otherwise("/"); //does not work
});