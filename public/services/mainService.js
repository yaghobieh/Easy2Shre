angular.module('mainServ', [])
    .factory('Mcs', function($http){
        mainFactory = {};

        // Main Get all, Create & Update
        mainFactory.getAllMain = function(){
            return $http.get('/admin/main');
        }

        mainFactory.createNewMain = function(mainInfo) {
            return $http.post('/admin/main', mainInfo);
        }

        mainFactory.updateMain = function(mainToUpdate) {
            return $http.post('/admin/editMain', mainToUpdate);
        }

        // Features Get all, Create, Delete & Update
        mainFactory.getAllFeatures = function() {
            return $http.get('/admin/features');
        }

        mainFactory.createNewFeature = function(featureInfoPack) {
            return $http.post('/admin/features', featureInfoPack);
        }

        mainFactory.updateFeatures = function(featureToUpdate) {
            return $http.post('/admin/editFeature', featureToUpdate);
        }

        mainFactory.deleteFeature = function (featureToDelete) {
            return $http.post('/admin/deleteFeatures', featureToDelete);
        }

        // About section Get all, Create & Update
        mainFactory.getAllAbout = function() {
            return $http.get('/admin/about');
        }

        mainFactory.createNewAbout = function(aboutSection) {
            return $http.post('/admin/about', aboutSection);
        }

        mainFactory.updateAboutSection = function(aboutSectionToUpdate) {
            return $http.post('/admin/editAboutSection', aboutSectionToUpdate);
        }

        //Save phone and name
        mainFactory.savePhoneOrEmail = function(phoneNumber) {
            return $http.post('admin/savePhoneOrName', phoneNumber);
        }

        mainFactory.updateClient = function(aboutSectionToUpdate) {
            return $http.post('/admin/editClient', aboutSectionToUpdate);
        }

        mainFactory.getAllClient = function() {
            return $http.get('/admin/client');
        }

        //Profiles
        mainFactory.getAllProfile = function(){
            return $http.get('/pr/profile');
        }

        mainFactory.createNewProfile = function(profileInfo) {
            return $http.post('/pr/profile', profileInfo);
        }

        mainFactory.updateProfile = function(profileToUpdate) {
            return $http.post('/pr/editProfile', profileToUpdate);
        }

        mainFactory.getUserByUsername = function(getUserByUsernamePack) {
            return $http.post('/pr/getUserByUsername', getUserByUsernamePack);
        }

        // mainFactory.loginProfile = function(loginProfilePack) {
        //     return $http.post('/pr/authenticate', loginProfilePack);
        // }

        // mainFactory.getProfileByUsernameUrl = function(usernameUrl) {
        //     console.log(usernameUrl);
        //     // objectProfile = { username: usernameUrl }; 
        //     return $http.post('/pr/getUserByUsernameUrl'+ usernameUrl);
        // }

        return mainFactory;
    });