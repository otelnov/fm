angular.module('js.general', []);
angular.module('js.page', []);

angular.module('js.modules', [
  'js.general', 'js.page'
]);

var app = angular.module('js.app', [
  'ui.router',
  'js.modules',
  'ui.bootstrap',
  'ngResource'
]);

app.run(function($rootScope, $state) {

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    if(error === 'user not logged in'){
      window.location = '/signup';
    }
    if(error === 'user logged in'){
      window.location = '/';
    }
  });

});

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise("/page");

    $stateProvider
      .state('js', {
        abstract: true,
        resolve: {
          user: function($http, $q){
            return $http({method: 'GET', url: '/api/me'}).then(function(resp){
              if(resp.data.error){
                return $q.reject('user not logged in');
              }
              return resp.data.user;
            });
          }
        },
        views: {
          '@': {
            templateUrl: '/components/general/layout.html'
          },
          'header@jse': {
            templateUrl: '/components/general/header.html',
            controller: 'HeaderController'
          },
          'footer@jse': {
            templateUrl: '/components/general/footer.html',
            controller: 'FooterController'
          }
        },
        page: {}
      })
      .state('signup', {
        url: '/signup',
        resolve: {
          user: function($http, $q){
            return $http({method: 'GET', url: '/api/me'}).then(function(resp){
              if(resp.data.user){
                return $q.reject('user logged in');
              }
            });
          }
        },
        views: {
          '@': {
            templateUrl: '/components/general/signup.html'
          }
        },
        page: {}
      })
      .state('js.page', {
        url: '/page',
        templateUrl: '/components/page/page.html',
        controller: 'PageController',
        page: {}
      });
  }]);

// Remove the ugly Facebook appended hash
// <https://github.com/jaredhanson/passport-facebook/issues/12>
(function removeFacebookAppendedHash() {
  if (!window.location.hash || window.location.hash !== '#_=_')
    return;
  if (window.history && window.history.replaceState)
    return window.history.replaceState("", document.title, window.location.pathname);
  // Prevent scrolling by storing the page's current scroll offset
  var scroll = {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  };
  window.location.hash = "";
  // Restore the scroll offset, should be flicker free
  document.body.scrollTop = scroll.top;
  document.body.scrollLeft = scroll.left;
}());
