'use strict';

/**
 * @ngdoc function
 * @name apiUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the apiUiApp
 */
angular.module('apiUiApp')
  .controller('MainCtrl', function () {

    var vm = this;

    vm.menuTemplate = {
      url:'views/menu.html'
    }

  });
