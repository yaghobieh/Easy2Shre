let express    = require('express');
let app        = express();
let router     = express.Router();
let mongoose   = require('mongoose');
let bodyParser = require('body-parser');
let morgan     = require('morgan');
let path       = require('path');
let multer     = require('multer');

// Routes
let api  = require('./api/routes/app')(router);
let administrator = require('./api/routes/administrator')(router);
let profiles = require('./api/routes/profiles')(router);

//Port
const port = process.env.PORT || 3000;

// Multer upload path
let upload = multer({ dest: 'public/uploads/' });

app.use(morgan('dev')); //Morgan is used for logging request details
app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname+ '/public')); //Root of location

//Route Paths
app.use('/admin', api);
app.use('/manage', administrator);
app.use('/pr', profiles);

mongoose.connect('mongodb://localhost:27017/easy2share', {useMongoClient:true}, function(err){
    if (err) console.log('Some Error accoure: ' +err);
    else console.log('Mongo Connected');
});

app.all('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(port, function(){
    console.log('SERVER port: ' +port);
})