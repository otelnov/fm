angular.module('fm.pages')
  .controller('TournamentController', [
    '$scope', '$state', 'TournamentService',
    function($scope, $state, tournamentService){

      var id = $state.params.id;
      tournamentService.getById({id: id}, function(err, data){
        console.log(data);
      });

    }
  ]);