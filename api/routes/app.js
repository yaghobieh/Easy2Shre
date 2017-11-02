let Main   = require('../models/main');
let Feature   = require('../models/features');
let About   = require('../models/about');
let ClientInfo   = require('../models/clientInfo');

module.exports = function (router) {

    //Main info update
    router.post('/main', function(req, res) {
        let main = new Main(); 
        main.title = req.body.title;
        main.sub_title_text = req.body.sub_title_text;
        main.sub_info_top = req.body.sub_info_top;
    
        let CRITERIA = req.body.title == null || req.body.title == '' || req.body.sub_title_text == null || req.body.sub_title_text == '' || req.body.sub_info_top == null || req.body.sub_info_top == '';
    
        if( CRITERIA ){
          res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
        } else {
          main.save(function(err){
            if (err) res.json({success: false, message: 'טעות באחד הערכים'});
            else res.json({ success: true, message: 'המידע הוכנס בהצלחה'});
          });
        }
    });

    router.post('/editMain', function(req, res) {
        console.log(req.body._id);
        let editedMain = {
            title: req.body.title,
            sub_title_text: req.body.sub_title_text,
            sub_info_top: req.body.sub_info_top
        }
    
        Main.findOneAndUpdate({_id: req.body._id}, editedMain, function(err, main){
            if (err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({ success: true, message: 'המידע התעדכן כראוי'});
        });
    });

    router.get('/main', function(req, res){
        Main.find(function(err, main){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(main) res.json({success: false, message: 'הצליח', info: main});
        })
    });

    //features info update
    router.get('/features', function(req, res){
        Feature.find(function(err, features){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(features) res.json({success: false, message: 'הצליח', info: features});
        })
    });

    router.post('/features', function(req, res) {
        let features = new Feature(); //Create new 
        features.title = req.body.title;
        features.sub_info= req.body.sub_info; 
    
        let CRITERIA = req.body.title == null || req.body.title == '' || req.body.sub_info == null || req.body.sub_info == '' ;
    
        if( CRITERIA ){
          res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
        } else {
          features.save(function(err){
            if (err) res.json({success: false, message: 'טעות באחד הערכים'});
            else res.json({ success: true, message: 'המידע הוכנס בהצלחה'});
          });
        }
    });

    router.post('/editFeature', function(req, res) {
        let editedFeatures = {
            title: req.body.title,
            sub_info: req.body.sub_info,
        }
        Feature.findOneAndUpdate({_id: req.body._id}, editedFeatures, function(err, feature){
            if (err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({ success: true, message: 'המידע התעדכן כראוי'});
        })
    });

    router.post('/deleteFeatures', function(req, res){
        Feature.remove({_id: req.body._id}, function(err, offer){
            if(err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({success: true, message: 'נמחק בהצלחה'});
        })
    });

    // About us update
    router.get('/about', function(req, res){
        About.find(function(err, about){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(about) res.json({success: false, message: 'הצליח', info: about}); 
        })
    });

    router.post('/about', function(req, res) {
        let about = new About(); //Create new 
        about.title = req.body.title;
        about.sub_info= req.body.sub_info; 
        about.about_section_title = req.body.about_section_title;
        about.about_section = req.body.about_section;
    
        let CRITERIA = req.body.title == null || req.body.title == '' || req.body.sub_info == null || req.body.sub_info == '' ||  req.body.about_section_title == ''|| req.body.about_section_title == null || req.body.about_section == '' || req.body.about_section == null;
    
        if( CRITERIA ){
          res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
        } else {
            about.save(function(err){
            if (err) res.json({success: false, message: 'טעות באחד הערכים'});
            else res.json({ success: true, message: 'המידע הוכנס בהצלחה'});
          });
        }
    });

    router.post('/editAboutSection', function(req, res) {
        let editedAboutSection = {
            title: req.body.title,
            sub_info: req.body.sub_info,
            about_section_title: req.body.about_section_title,
            about_section: req.body.about_section,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            email: req.body.email
        }
    
        About.findOneAndUpdate({_id: req.body._id}, editedAboutSection, function(err, feature){
            if (err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({ success: true, message: 'המידע התעדכן כראוי'});
        })
    });

    //Client Info
    router.get('/client', function(req, res){
        ClientInfo.find(function(err, clients){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(clients) res.json({success: false, message: 'הצליח', info: clients}); 
        })
    });

    router.post('/editClient', function(req, res) {
        let editedClient = {
            full_name: req.body.full_name,
            phone_or_email: req.body.phone_or_email,
            checked: req.body.checked
        }
    
        ClientInfo.findOneAndUpdate({_id: req.body._id}, editedClient, function(err, client){
            if (err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({ success: true, message: 'המידע התעדכן כראוי'});
        })
    });

    router.post('/savePhoneOrName', function(req, res){
        let clientInfo = new ClientInfo();
        clientInfo.full_name = req.body.full_name;
        clientInfo.phone_or_email = req.body.phone_or_email;

        let CRITERIA = req.body.full_name == '' || req.body.full_name == null || req.body.phone_or_email == '' || req.body.phone_or_email == null;

        if( CRITERIA ){
            res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
        } else {
            clientInfo.save(function(err){
                if (err) res.json({success: false, message: 'טעות באחד הערכים'});
                else res.json({ success: true, message: 'המידע הוכנס בהצלחה'});
            });
        }
    });
    
    return router;
}    