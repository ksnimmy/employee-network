/**
 * 
 * Employee Network
 * @description           Description
 * @author                Nimmymol Kalathil Sambasivan
 * @version               1.0.0
 * @date                  Feb 2017
 * 
 */
;(function() {
  angular
    .module('boilerplate', [
      'ngRoute'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/page3', {
        templateUrl: 'views/page3.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/page2', {
        templateUrl: 'views/page2.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');

  }

  angular
    .module('boilerplate')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location'];

  function authInterceptor($rootScope, $q, $location) {

    return {
      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },
    };
  }


  /**
   * Run block
   */
  angular
    .module('boilerplate')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }


})();