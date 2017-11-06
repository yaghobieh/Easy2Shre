let app = angular.module('appRoute', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainController',
                controllerAs: 'main'
            })

            // .when('/About-us', {
            //     templateUrl: 'views/about-us.html',
            //     controller: 'mainController',
            //     controllerAs: 'about'
            // })

            .when('/login' ,{
                templateUrl: 'views/login.html',
                controller: 'adminController',
                controllerAs: 'login',
                authenticated: false
            })

            .when('/loginProfile', {
                templateUrl: 'views/loginProfile.html',
                controller: 'profileController',
                controllerAs: 'loginProfile',
                isProfile: false
            })

            .when('/adminPanel', {
                templateUrl: 'views/admin.html',
                controller: 'mainController',
                controllerAs: 'adminPanel',
                authenticated: true
            })

            .when('/success', {
                templateUrl: 'views/status/success.html'
            })

            .when('/error', {
                templateUrl: 'views/status/error.html'
            })

            .otherwise({ redirectTo: '/' });
            
            $locationProvider.html5Mode({ //No base
                enabled: true,
                requireBase: false
            });

    })

app.run(['$rootScope', 'Adm', 'Profile', '$location', '$timeout', function ($rootScope, Adm, Profile, $location, $timeout) {
    
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route.authenticated == true){
            //If the user isn't logged don't let him go into This route
            if ( !Adm.isloggedIn() ){
              event.preventDefault();
              $location.path('/error');
              $timeout(function () {
                $location.path('/');
              }, 2000);
            }
          } else if (next.$$route.authenticated == false){
            if (Adm.isloggedIn()) {
              event.preventDefault();
              $location.path('/error')
              $timeout(function () {
                $location.path('/');
              }, 2000);
            }
          } else if (next.$$route.isProfile == true) {
            if(!Profile.isloggedIn()){
                event.preventDefault();
                $location.path('/error');
                $timeout(function () {
                  $location.path('/');
                }, 2000);
            }
          }  else if (next.$$route.isProfile == false){
            if (Profile.isloggedIn()) {
                event.preventDefault();
                $location.path('/error')
                $timeout(function () {
                  $location.path('/');
                }, 2000);
          }
        }
    });
    
}]);