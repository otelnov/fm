angular.module('js.general')
  .service('GeneralService', [
    function generalService() {
      var service = {
        cache: {
          get: function (key, cb) {
            return cb(null, cache[key]);
          },
          set: function (key, value, cb) {
            cache[key] = value;
            return cb(null, cache[key]);
          },
          del: function(key, cb){
            delete cache[key];
            return cb();
          }
        }
      };

      return service;
    }
  ]);
