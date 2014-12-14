angular.module('fm.general')
  .controller('HeaderController', [
    "user", '$scope',
    function(user, $scope){
      $scope.user = user;
    }
  ]);