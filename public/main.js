angular.module('mainApp', ['appRoute', 'mainCApp', 'profileApp', 'mainServ', 'adminApp', 'adminServ', 'profileServ'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptorsProfile');
    })
    