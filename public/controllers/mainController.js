angular.module('mainCApp', ['mainServ', 'adminServ', 'profileServ'])
    .controller('mainController', function($http, $timeout, $routeParams, Mcs, Adm, Profile){
        var app = this; //Static this for inside a function
        this.form_active = true;
        this.showUserBack = false; //Show back Select Profile

        // Main
        this.getAllMain = Mcs.getAllMain().then(function(data){
            // console.log(data);
            app.getAllMain = data.data.info[0];
            app.mainToUpdate = app.getAllMain;
        });

        this.createNewMainInfo = function(mainInfo) {
            Mcs.createNewMain(app.mainInfo).then(function(data){})
        };

        this.updateMain = function(mainToUpdate) {
            Mcs.updateMain(app.mainToUpdate).then(function(data){
                console.log(data);
            })
        };

        // Features
        this.getAllFeatures = Mcs.getAllFeatures().then(function(data){
            // console.log(data);
            app.getAllFeatures = data.data.info;
            app.featureToUpdate = app.getAllFeatures;
            app.featureToDelete = app.getAllFeatures;
        });

        this.createNewFeature = function(featureInfoPack) {
            Mcs.createNewFeature(app.featureInfoPack).then(function(data){
                // console.log(data);
            })
        };

        this.updateFeatures = function(featureToUpdate, index) {
            Mcs.updateFeatures(app.featureToUpdate[index]).then(function(data){
                // console.log(data);
            })
        };

        this.deleteFeature = function(featureToDelete, index) {
            Mcs.deleteFeature(app.featureToDelete[index]).then(function(data){
                // console.log(data);
            })
        };

        // About Section info
        this.getAllAbout = Mcs.getAllAbout().then(function(data){
            // console.log(data);
            app.getAllAbout = data.data.info[0];
            app.aboutSectionToUpdate = app.getAllAbout;
        });

        this.createNewAbout = function(aboutSection) {
            Mcs.createNewAbout(app.aboutSection).then(function(data){
                // console.log(data);
            })
        };

        this.updateAboutSection = function(aboutSectionToUpdate) {
            Mcs.updateAboutSection(app.aboutSectionToUpdate).then(function(data){
                // console.log(data);
            })
        };

        //Send phone/ email
        this.savePhoneOrEmail = function(phoneNumber) {
            Mcs.savePhoneOrEmail(app.phoneNumber).then(function(data){
                // console.log(data);
                if(data.data.success == true){
                    app.form_active = false;
                    app.phoneNumber.full_name = '';
                    app.phoneNumber.phone_or_email = '';
                    $timeout(function () {
                        app.form_active = true;
                    }, 2000);
                }
            })
        }

        this.getAllCients = Mcs.getAllClient().then(function(data){
            // console.log(data);
            app.getAllCients = data.data.info;
            app.clientToEdit = app.getAllCients;
        });

        this.updateClient = function(clientToEdit, index) {
            //Change client.checked field
            if(app.clientToEdit[index].checked == false) {
                app.clientToEdit[index].checked = true;
            } else if (app.clientToEdit[index].checked == true){
                app.clientToEdit[index].checked = false;
            }

            Mcs.updateClient(app.clientToEdit[index]).then(function(data){
            })
        };

        // Profiles
        this.getAllProfiles = Mcs.getAllProfile().then(function(data){
            // console.log(data);
            app.getAllProfiles = data.data.info;
            app.profileToUpdate = app.getAllProfiles;
        });

        this.createNewProfile = function(profileInfo) {
            Mcs.createNewProfile(app.profileInfo).then(function(data){
                if(data.data.success){
                    app.profileInfo = '';
                    app.profileInfoMsg = data.data.message;
                }
            })
        };

        this.updateProfile = function(profileToUpdate, index) {
            Mcs.updateProfile(app.profileToUpdate[index]).then(function(data){
            })
        };

        this.getUserByUsername = function() {
            app.username = { username: app.chengedUser };
            Mcs.getUserByUsername(app.username).then(function(data){
                app.getUserBack = data.data.info;
                app.showUserBack = true;
            });
        }

        this.editProfileByUsername = function(getUserBack) {
            Mcs.updateProfile(app.getUserBack).then(function(data){
                app.ProfileByUsername = data.data.message;
                app.getUserBack = '';
            })
        }

        this.loginProfile = function(loginProfilePack) {
            Mcs.loginProfile(app.loginProfilePack).then(function(data){
                console.log(data);
            });
        }

        //Profile
        this.login = function(profileLoginData) {
            console.log(app.profileLoginData);
            Profile.login(app.profileLoginData).then(function(data){
                console.log(data.data);
            });
        }

        

    });