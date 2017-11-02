angular.module('profileServ', [])
.factory('Prf', function($http, AuthProfileToken){
    userFactory = {};

    // Set token into localStorage
    userFactory.login = function(profileData) {
        
        return $http.post('/pr/loginProfile', profileData).then(function(data) {
            console.log(data.data);
            AuthProfileToken.setToken(data.data.profileToken);
            return data;
        });
    };

    userFactory.isloggedIn = function () {
        if ( AuthProfileToken.getToken() ){
            return true;
        }else{
            return false;
        }
    };

    userFactory.getUser = function() {
        // Check first if user has a token
        if (AuthProfileToken.getToken()) {
            return $http.post('/pr/profMe'); // Return user's data
        } else {
            $q.reject({ message: 'User has no token' }); // Reject if no token exists
        }
    }

    userFactory.logout = function () {
        //Remove the Toekn
        AuthProfileToken.setToken();
    }

    return userFactory;
})

.factory('AuthProfileToken', function($window){
    var authTokenFactory = {}; // Create factory object

    authTokenFactory.setToken = function(profileToken) {
        //If token is send
        if( profileToken ){
            $window.localStorage.setItem('profileToken', profileToken);
        } else {
           $window.localStorage.removeItem('profileToken'); 
        }
    };

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('profileToken');
    };

    return authTokenFactory; // Return factory object
})

.factory('AuthUserInterceptors', function(AuthProfileToken) {
    var authInterceptorsFactory  = {};

    // Function to check for token in local storage and attach to header if so
    authInterceptorsFactory.request = function(config) {
        var profileToken = AuthProfileToken.getToken(); // Check if a token is in local storage
        if (profileToken) config.headers['x-access-token'] = token; //If exists, attach to headers

        return config; // Return config object for use in app.js (config file)
    };

    return authInterceptorsFactory ;
});
