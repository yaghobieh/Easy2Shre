angular.module('adminApp', ['adminServ'])
    .controller('adminController', function($timeout, $location, $rootScope, $window, Adm){
        let app = this;
        this.isLogged = false;

        $rootScope.$on('$routeChangeStart', function(){
            //Admin change
            if( Adm.isloggedIn() ){
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

            $location.path('/success');
            $timeout(function(){ 
                $location.path('/');
            }, 2000);
        } 
        
    })