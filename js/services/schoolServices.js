schoolApp.factory("schoolsService", function($http){
    var _schools = [];

    var _getSchools = function(){
        $http.get("../../data/allschools.json")
            .then(function(results){
                console.log("Success!");
                //Success
                angular.copy(results.data, _schools); //this is the preferred; instead of $scope.movies = result.data
            }, function(results){
                //Error
            })
    }


    return{
        schools: _schools,
        getSchools: _getSchools,
    };
});



