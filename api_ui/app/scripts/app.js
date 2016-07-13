'use strict';

/**
 * @ngdoc overview
 * @name apiUiApp
 * @description
 * # apiUiApp
 *
 * Main module of the application.
 */
angular
  .module('apiUiApp', [
    'authService',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'satellizer',
    'toastr',
    'datatables'
  ])
  .constant('API_URL', 'http://localhost/sale-backend/api/public/')
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
     localStorageServiceProvider.setPrefix('ls');
   }])
  .config(function ($routeProvider, $authProvider) {
    $authProvider.loginUrl = 'http://localhost/incident-reporting/api/public/auth_login';
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/categories', {
        templateUrl: 'views/categories/index.html',
        controller: 'CategoryCtrl',
        controllerAs: 'categories'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, authUser, toastr){
    var rootProvider = ['/','/about'];

    $rootScope.$on('$routeChangeStart', function(){
      if(($.inArray($location.path(), rootProvider)!== -1) && !authUser.isLoggedIn()){
        toastr.error('This is a error session data','Message');
        $location.path('/login');
      }
    });
  });
