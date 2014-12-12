angular.module('js.page')
  .service('PageService', [
    '$resource',
    function pageService($resource) {
      var PageResource = $resource('api/page/:id', {}, {
        put: { method: 'PUT' }
      });

      var service = {
        get: function(cb){
          PageResource.get(function(resp){
            cb(null, resp.data, resp);
          }, function(response){
            cb(response);
          });
        },
        put: function(data, cb){
          PageResource.put({id: data._id}, data, function(resp){
            cb(resp.error, resp.data, resp);
          });
        },
        post: function(data, cb){
          PageResource.save(data, function(resp){
            cb(resp.error, resp.data, resp);
          });
        },
        delete: function(data, cb){
          PageResource.delete({id: data._id}, function(resp){
            cb(resp.error, resp.data, resp);
          });
        }
      };

      return service;
    }
  ]);