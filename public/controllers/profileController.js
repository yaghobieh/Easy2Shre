angular.module('profileApp', ['profileServ'])
.controller('profileController', function($timeout, $location, $rootScope, $window, Profile){
    let app = this;
    this.isLogged = false;

    $rootScope.$on('$routeChangeStart', function(){
        //Admin change
        if( Profile.isloggedIn() ){
            console.log('Success: The user is logged in!');
            Profile.getUser().then(function(data){
                app.profileInfo = data.data;
            });
            app.isLogged = true;
        }else{
            app.profileInfo = '';
            app.isLogged = false;
        }

        if($location.hash() == '_=_') $location.hash(null);
    })

    //Login Admin
    this.login = function(profileLoginData) {
        Profile.login(app.profileLoginData).then(function(data){
            if(data.data.success){
                app.profileInfo = {
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
        Profile.logout();
        console.log('YES');

        $location.path('/success');
        $timeout(function(){ 
            $location.path('/');
        }, 2000);
    } 
    
})