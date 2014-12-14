angular.module('fm.pages')
  .controller('TournamentController', [
    '$scope', '$state', 'TournamentService',
    function($scope, $state, tournamentService){
      var id = $state.params.id;
      tournamentService.getById({id: id}, function(err, data){
        $scope.tournament = data.tournament;
        console.log(data);
      });

    }
  ])
  .controller('CreateTournamentController', [
    '$scope', '$state', 'TournamentService',
    function($scope, $state, tournamentService){

      $scope.model = {};

      tournamentService.types(function (err, data) {
        $scope.types = data.types;
      });

      $scope.create = function() {
        tournamentService.post({
          title: $scope.model.title,
          type: $scope.model.type._id
        }, function (err, data) {
          $state.go('fm.tournament', {id: data.tournament._id});
        });
      };

    }
  ]);