angular.module('fm.pages')
  .service('TournamentService', [
    '$resource',
    function tournamentService($resource) {
      var TournamentResource = $resource('api/tournaments/:id', {}, {
        put: { method: 'PUT' },
        types: { url: 'api/tournamentTypes' }
      });

      var service = {
        getById: function(data, cb){
          TournamentResource.get(data, function(resp){
            cb(null, resp.data, resp);
          }, function(response){
            cb(response);
          });
        },
        put: function(data, cb){
          TournamentResource.put({id: data._id}, data, function(resp){
            cb(resp.error, resp.data, resp);
          });
        },
        post: function(data, cb){
          TournamentResource.save(data, function(resp){
            cb(resp.error, resp.data, resp);
          });
        },
        delete: function(data, cb){
          TournamentResource.delete({id: data._id}, function(resp){
            cb(resp.error, resp.data, resp);
          });
        },
        types: function(cb){
          TournamentResource.types(function(resp){
            cb(resp.error, resp.data, resp);
          });
        }
      };

      return service;
    }
  ]);