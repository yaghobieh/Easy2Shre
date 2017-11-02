let Admin   = require('../models/admin');
let jwt     = require('jsonwebtoken');
let secret  = 'easy2share';

module.exports = function (router) {

    router.post('/admin', function(req, res){
        let admin = new Admin();
        admin.full_name = req.body.full_name;
        admin.username = req.body.username;
        admin.email = req.body.email;
        admin.phone_number = req.body.phone_number;
        admin.password = req.body.password;

        var CRITERIA = req.body.full_name == '' || req.body.full_name == null || req.body.username == '' || req.body.username == null || req.body.email == '' || req.body.email == null || req.body.phone_number == '' || req.body.phone_number == null || req.body.password == '' || req.body.password == null;

        if(CRITERIA){
            res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
        } else {
            admin.save(function(err){
                if (err) res.json({success: false, message: 'טעות באחד הערכים'});
                else res.json({ success: true, message: 'המידע הוכנס בהצלחה'});
            })
        }
    });

    router.post('/editAdmin', function(req, res) {
        let editedAdmin = {
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            phone_number: req.body.phone_number
        }
    
        Admin.findOneAndUpdate({_id: req.body._id}, editedAdmin, function(err, admin){
            if (err) res.json({success: false, message: 'אנא בדוק את הערכים שהכנסת שנית'});
            else res.json({ success: true, message: 'המידע התעדכן כראוי'});
        });
    });

    router.get('/admin', function(req, res){
        Admin.find(function(err, admin){
            if(err) res.json({success: false, message: 'אין מידע קיים'});
            if(admin) res.json({success: false, message: 'הצליח', info: admin});
        })
    });

    router.post('/authenticate', function(req, res){
        Admin.findOne({ username: req.body.username }).select('username email password phone_number').exec(function(err, admin){
          if (err) throw err;
    
          if(!admin){
            res.json({ success: false, message: 'לא נמצא משתמש' });
          } else if(admin) {
            if (req.body.password){
              var validPassword = admin.comparePass(req.body.password);
            } else {
              res.send('בדוק את הסיסמא שלך');
            }
            
            //Check password validation
            if(!validPassword){
              res.json({ success: false, message: 'סיסמא לא תקינה' });
            }else{
              //If Validation is true -> create TOKEN for 24H
              var token = jwt.sign({ username: admin.username, email: admin.email, phone: admin.phone_number}, secret, { expiresIn: '24h' }); 
              res.json({ success: true, message: 'התחברות הצליחה', token: token, info: {username: admin.username, email: admin.email, phone: admin.phone_number} });
            }
          }
        })
      });

      router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token']; // Check for token in body, URL, or headers
  
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

    router.post('/me', function(req, res) {
        res.send(req.decoded); // Return the token acquired from middleware
     });

    return router;
}