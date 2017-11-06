let Profile = require('../models/profile');
let jwt     = require('jsonwebtoken');
let secret  = 'easy2share';

module.exports = function (router) {

    router.get('/profile', function(req, res){
        Profile.find(function(err, profiles){
            if(err) res.json({success: false, message: 'אין משתמשים'});
            if(profiles) res.json({success: true, message: 'משתמשים נמצאו', info: profiles});
        })
    });

    router.post('/profile', function(req, res){
        let profile = new Profile();
        profile.username = req.body.username;
        profile.email = req.body.email;
        profile.password = req.body.password;
        profile.about = req.body.about;
        profile.linkedIn = req.body.linkedIn;
        profile.location = req.body.location
        profile.phone_number = req.body.phone_number;
        profile.whatsapp = req.body.whatsapp;
        profile.instagram = req.body.instagram;
        profile.facebook = req.body.facebook;
        profile.cover_photo = req.body.cover_photo;
        profile.profile_picture = req.body.profile_picture;

        if(!req.body){
            res.json({success: false, message: 'בדוק את הערכים שלך'});
        } else {
            profile.save(function(err){
                if(err) res.json({success: false, message: 'בדוק את הערכים שלך שנית'});
                else res.json({success: true, message: 'משתמש זה נוצר בהצלחה'});
            })
        }
    });

    router.post('/editProfile', function(req, res){
        let id = req.body._id;
        Profile.findOneAndUpdate({_id: id}, req.body, function(err, profile){
            if(err) res.json({success: false, message: 'פרופיל זה לא עודכן אנא בדוק שנית'});
            else res.json({success: true, message: 'פרופיל זה עודכן בהצלחה', info: profile});
        })
    });

    router.post('/getUserByUsername', function(req, res){
        let username = req.body.username;
        Profile.findOne({username: username}, function(err, profile){
            if(err) res.json({success: false, message: 'פרופיל זה לא עודכן אנא בדוק שנית'});
            else res.json({success: true, message: 'פרופיל זה עודכן בהצלחה', info: profile});
        })
    })

    router.post('/authProfile', function(req, res){
        Profile.findOne({email: req.body.email}, function(err, profile){
            if (err) throw err;
            
            
            if(!profile){
                res.json({ success: false, message: 'לא נמצא משתמש' });
            } else if(profile) {
            if (req.body.password){
                var validPassword = profile.checkPass(req.body.password);
            } else {
                res.send('בדוק את הסיסמא שלך');
            }
            
            //Check password validation
                if(!validPassword){
                    res.json({ success: false, message: 'סיסמא לא תקינה' });
                }else{
                    //If Validation is true -> create TOKEN for 24H
                    var token = jwt.sign({ profile: profile }, secret, { expiresIn: '24h' }); 
                    res.json({ success: true, message: 'התחברות הצליחה', info: profile, tokenProfile: token});
                }
            }
        });
    })

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-tokenProfile']; // Check for token in body, URL, or headers

        // Check if token is valid and not expired  
        if (token) {
            // Function to verify token
            jwt.verify(token, secret, function(err, decoded) {
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

    router.post('/meProfile', function(req, res) {
        res.send(req.decoded); // Return the token acquired from middleware
     });

    return router;
}