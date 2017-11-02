angular.module('mainApp', ['appRoute', 'mainCApp', 'mainServ', 'adminApp', 'adminServ', 'profileServ'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
        $httpProvider.interceptors.push('AuthUserInterceptors');
    });
    