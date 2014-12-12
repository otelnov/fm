angular.module('js.page')
  .controller('PageController', [
    '$scope', 'user',
    function pageController($scope, user) {
      $scope.name = user.name;
    }
  ]);