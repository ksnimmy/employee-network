;(function() {

  'use strict';

  /**
   * Main navigation, just a HTML template
   * @author Nimmymol Kalathil Sambasivan
   * @ngdoc  Directive
   *
   * @example
   * <main-nav></main-nav>
   *
   */
  angular
    .module('boilerplate')
    .directive('mainNav', tinMainNav);

  function tinMainNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      score:{
        data: '=',
      },
      templateUrl: 'components/directives/main-nav.html'
    };

    return directiveDefinitionObject;
  }

})();