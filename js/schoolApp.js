var schoolApp = angular.module("schoolApp", []);

//...configuring and routing

schoolApp.config(function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when("/",{
            controller: "SchoolsCtrl",
            templateUrl: "js/views/schoolsListView.html"
        });
 
    $routeProvider.otherwise({"redirectTo": "/"});  //.otherwise("/"); //does not work
});