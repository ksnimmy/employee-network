/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['QueryService', '$scope', 'QueryService'];


  function MainController(QueryService, $scope, QueryService) {
    QueryService.getEmployees()
      .then(function(data) {
        $scope.networkData = data;
      }, function(error) {
        console.log(error);
      });
      QueryService.getEmployees2()
      .then(function(data) {
        $scope.networkData2 = data;
      }, function(error) {
        console.log(error);
      });
  }
})();