angular.module('adminApp', ['adminServ', 'profileServ'])
    .controller('adminController', function($timeout, $location, $rootScope, $window, Adm, Prf){
        let app = this;
        this.isLogged = false;
        this.isLoggedProfile = false;

        $rootScope.$on('$routeChangeStart', function(){
            //Admin change
            if( Adm.isloggedIn() ){
                console.log('Success: The user is logged in!');
                Adm.getUser().then(function(data){
                    app.adminInfo = {
                        username: data.data.username,
                        phone_number: data.data.phone,
                        email: data.data.email
                    }
                });
                app.isLogged = true;
            }else{
                app.adminInfo = {
                    username: '',
                    phone_number: '',
                    email: ''
                }
                app.isLogged = false;
            }

            //Profile change
            if( Prf.isloggedIn() ){
                console.log('Success: The user is logged in!');
                Prf.getUser().then(function(data){
                    app.profileInfo = {
                        username: data.data.username,
                        email: data.data.email
                    }
                });
                app.isLoggedProfile = true;
            }else{
                app.profileInfo = {
                    username: '',
                    email: ''
                }
                app.isLoggedProfile = false;
            }

            if($location.hash() == '_=_') $location.hash(null);
        })

        //Login Admin
        this.login = function(loginData) {
            Adm.login(app.loginData).then(function(data){
                if(data.data.success){
                    app.adminInfo = {
                        username: data.data.info.username,
                        phone_number: data.data.info.phone,
                        email: data.data.info.email
                    }
                    app.isLoggedIn = data.data.message;
                    app.loginClass = 'alert alert-info';
                    $timeout(function(){ 
                        $location.path('/');
                    }, 2000);
                } else {
                    app.isLoggedIn = data.data.message; 
                    app.loginClass = 'alert alert-danger';
                }
            });
        }
        
        this.logout = function () {
            Adm.logout();
            console.log('YES');

            $location.path('/success');
            $timeout(function(){ 
                $location.path('/');
            }, 2000);
        } 

        // Login profiles
        this.loginIntoProfile = function(profileData) {
            Prf.login(app.profileData).then(function(data){
                if(data.data.success){
                    app.profileInfo = {
                        username: data.data.info.username,
                        email: data.data.info.email
                    }
                    app.isLoggedInProfile = data.data.message;
                    app.loginClassProfile = 'alert alert-info';
                    $timeout(function(){ 
                        $location.path('/');
                    }, 2000);
                } else {
                    app.isLoggedInProfile = data.data.message; 
                    app.loginClassProfile = 'alert alert-danger';
                }
            });
        }

        this.logoutProfile = function () {
            Prf.logout();
            console.log('YES');

            $location.path('/success');
            $timeout(function(){ 
                $location.path('/');
            }, 2000);
        } 
    })