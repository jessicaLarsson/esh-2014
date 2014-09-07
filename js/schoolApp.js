var schoolApp = angular.module("schoolApp", []);
var mapFunction = new mapFile();
//var travelPlanner = new resRobot();
//...configuring and routing

schoolApp.config(function($routeProvider){
    
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