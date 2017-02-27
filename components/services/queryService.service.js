;(function() {
  'use strict';

  angular
    .module('boilerplate')
    .factory('QueryService', [
      '$http', '$q', QueryService
    ]);

  function QueryService($http, $q) {
    var service = {
      getEmployees: getEmployees,
      getEmployees2: getEmployees2
    };

    return service;

    function getEmployees() {
      return $http.get('/data/employee.json').then(onSuccess, onError);
      function onSuccess(response) {
          return response.data;
      }
      function onError(message) {
          return $q.reject();
      }
    }

    function getEmployees2() {
      return $http.get('/data/employee2.json').then(onSuccess, onError);
      function onSuccess(response) {
          return response.data;
      }
      function onError(message) {
          return $q.reject();
      }
    }
  }
})();
