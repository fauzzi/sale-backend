'use strict';

/**
 * @ngdoc service
 * @name apiUiApp.authService
 * @description
 * # authService
 * Service in the apiUiApp.
 */
 angular.module('authService',[])
   .factory('sessionControl', function(){
     return {
       get: function(key){
         return sessionStorage.getItem(key);
       },
       set: function(key,val){
         return sessionStorage.setItem(key, val);
       },
       unset: function(key){
         return sessionStorage.removeItem(key)
       }
     };
   })
   .factory('authUser', function ($auth, sessionControl, toastr, $location) {
     var cacheSession = function(email, username, avatar){
       sessionControl.set('userIsLogin', true);
       sessionControl.set('email', email);
       sessionControl.set('username', username);
       sessionControl.set('avatar', avatar);
     };

     var unCacheSession = function(){
       sessionControl.unset('userIsLogin');
       sessionControl.unset('email');
       sessionControl.unset('username');
       sessionControl.unset('avatar');
     };
     // AngularJS will instantiate a singleton by calling "new" on this function
     var login = function(loginForm){
       $auth.login(loginForm).then(
         function(response){
           cacheSession(response.data.user.email, response.data.user.name, loginForm.avatar);
           $location.path('/');
           toastr.success('You are logged in ', 'Message');
           // console.log(response);
         },
         function(error){
           unCacheSession();
           toastr.error(error.data.error,'Error');
           console.log(error);
         }
       );
     };

     return {
       loginApi : function(loginForm){
         login(loginForm);
       },
       logout: function(){
           $auth.logout();
           unCacheSession();
           toastr.success('You are log out!', 'Message');
           $location.path('/login');
       },
       isLoggedIn: function(){
         return sessionControl.get('userIsLogin') !== null;
       },
       myToken: function(){
         return $auth.getToken();
       }
     }
   });
