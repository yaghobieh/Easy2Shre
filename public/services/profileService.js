angular.module('profileServ', [])
    .factory('Profile', function($http, AuthTokenProfile){
        profileFactory = {};

        profileFactory.login = function(profileLoginData) {
            return $http.post('/pr/authProfile', profileLoginData).then(function(data) {
                AuthTokenProfile.setToken(data.data.tokenProfile);
                // console.log(data.data);
                return data;
            });
        }

        profileFactory.isloggedIn = function () {
            if ( AuthTokenProfile.getToken() ){
                return true;
            }else{
                return false;
            }
        };

        profileFactory.getUser = function() {
            // Check first if user has a token
            if (AuthTokenProfile.getToken()) {
                return $http.post('/pr/meProfile'); // Return user's data
            } else {
                $q.reject({ message: 'User has no token' }); // Reject if no token exists
            }
        }
    
        profileFactory.logout = function () {
            //Remove the Toekn
            AuthTokenProfile.setToken();
        }

        return profileFactory;
    })

    .factory('AuthTokenProfile', function($window){
        var authTokenFactory = {}; // Create factory object
    
        authTokenFactory.setToken = function(token) {
            //If token is send
            if( token ){
                $window.localStorage.setItem('tokenProfile', token);
            } else {
               $window.localStorage.removeItem('tokenProfile'); 
            }
        };
    
        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('tokenProfile');
        };
    
        return authTokenFactory; // Return factory object
    })

    .factory('AuthInterceptorsProfile', function(AuthTokenProfile) {
        var authInterceptorsFactory  = {};
    
        // Function to check for token in local storage and attach to header if so
        authInterceptorsFactory.request = function(config) {
            var token = AuthTokenProfile.getToken(); // Check if a token is in local storage
            if (token) config.headers['x-access-tokenProfile'] = token; //If exists, attach to headers
    
            return config; // Return config object for use in app.js (config file)
        };
    
        return authInterceptorsFactory ;
    });