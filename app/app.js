const app = angular.module('mainApp', []);


let mainController = function($scope, $http){
  $scope.searchObject;
  $scope.search;

  $scope.submit = function() {
    $http.get(`http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${$scope.search}&gsrlimit=10&prop=info%7Cdescription&inprop=url&origin=*`)
    .then(response, err);
    function response(data){
      console.log(data);
      console.log('Success');
      $scope.searchObject = data.data.query.pages;
    }
    function err(errr){
      console.log('Error');
      console.log(errr);
    }
  }

}

app.controller('mainController', ['$scope', '$http', mainController]);
