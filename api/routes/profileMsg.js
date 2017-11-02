let Profile = require('../models/profile');
let jwtProfile     = require('jsonwebtoken');
let secret  = 'easy2shareProfile';

module.exports = function (router) {

    router.post('/profile', function(req, res) {
        let profile = new Profile(); 
        profile.username= req.body.username;
        profile.password= req.body.password;
        profile.email= req.body.email;
        profile.profile_picture= req.body.profile_picture;
        profile.cover_photo= req.body.cover_photo;
        profile.facebook= req.body.facebook;
        profile.instagram= req.body.instagram;
        profile.whatsapp= req.body.whatsapp;
        profile.phone_number= req.body.phone_number;
        profile.location= req.body.location;
        profile.linkedIn= req.body.linkedIn;
        profile.about= req.body.about;
        
        let CRITERIA = req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.about == '' || req.body.about == null || req.body.profile_picture == '' || req.body.profile_picture == null;
    
        if( CRITERIA ){
          res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
        } else {
          profile.save(function(err){
            if (err) res.json({success: false, message: 'טעות באחד הערכים'});
            else res.json({ success: true, message: 'המידע הוכנס בהצלחה'});
          });
        }
    });

    router.post('/editProfile', function(req, res) {
        console.log(req.body._id);
        let editedProfile = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            profile_picture: req.body.profile_picture,
            cover_photo: req.body.cover_photo,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            whatsapp: req.body.whatsapp,
            phone_number: req.body.phone_number,
            location: req.body.location,
            linkedIn: req.body.linkedIn,
            about: req.body.about
        }
    
        Profile.findOneAndUpdate({_id: req.body._id}, editedProfile, function(err, profile){
            if (err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({ success: true, message: 'המידע התעדכן כראוי'});
        });
    });

    router.get('/profile', function(req, res){
        Profile.find(function(err, profiles){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(profiles) res.json({success: false, message: 'הצליח', info: profiles});
        })
    });

    // router.get('/getUserByUsernameUrl/:username', function(req, res){
    //     let usernameUrl = req.params.username;
    //     console.log(req.params.username);
    //     Profile.find({username: usernameUrl}, function(err, profile){
    //         if(err) res.json({success: false, message: 'אין מידע קיים'});
    //         if(profile) res.json({success: false, message: 'הצליח', info: profile});
    //     });
    // })

    router.post('/getUserByUsername', function(req, res){
        Profile.find({username: req.body.username}, function(err, profile){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(profile) res.json({success: false, message: 'הצליח', info: profile});
        });
    });

    router.post('/loginProfile', function(req, res){
        Profile.findOne({username: req.body.username}, function(err, profile){
            if(err) res.json({success: false, message: 'Some error'});
            if(!profile){
                res.json({success: false, message:'משתמש זה אינו קיים במערכת'});
            } else if(profile) { 
                var validPassword = profile.comparePass(req.body.password);
            } else {
                res.send({success: false, message: 'בדוק את הסיסמא שלך'})
            }

            if(!validPassword) {
                res.json({ success: false, message: 'סיסמא לא תקינה' });
            } else {
                var profileToken = jwtProfile.sign({ username: profile.username, email: profile.email}, secret, { expiresIn: '24h' }); 
                res.json({ success: true, message: 'התתחברות לפרופיל הצליחה', profileToken: profileToken ,info: profile });
            }
        })
      });

      router.use(function(req, res, next) {
        var profileToken = req.body.profileToken || req.body.query || req.headers['x-access-token']; // Check for token in body, URL, or headers
  
        // Check if token is valid and not expired  
        if (profileToken) {
            // Function to verify token
            jwtProfile.verify(profileToken, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' }); // Token has expired or is invalid
                } else {
                    req.decoded = decoded; // Assign to req. variable to be able to use it in next() route ('/me' route)
                    next(); // Required to leave middleware
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' }); // Return error if no token was provided in the request
        }
    });

    router.post('/profMe', function(req, res) {
        res.send(req.decoded); // Return the token acquired from middleware
     });

    return router
}