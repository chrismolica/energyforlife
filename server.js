/**
 * Created by chrismolica on 3/4/15.
 */

//APP INITIALIZATION
var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    routes = require(__dirname +'/server/controllers/routes'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    meetupsController = require(__dirname +'/server/controllers/meeetups-controllers'),
    emailController = require(__dirname+'/server/controllers/emailsubscription-controller');


// MONGOO DB DATABASE SETUP
mongoose.connect('mongodb://admin:cmpi95mc@ds027318.mongolab.com:27318/heroku_app34548873');

app.set('view engine', 'jade');
//PAYPAL API CONFIG
try{
    var configJSON = fs.readFileSync(__dirname+"/config.json");
    var config = JSON.parse(configJSON.toString());
}catch (e){
    console.error("File config.json not found or is invalid: "+ e.message);
    process.exit(1);
}

app.set('trust proxy', 1);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes.init(config);
//app.use(app.router);
//app.use(express.favicon());
//app.use(express.logger('dev'));

//APP ROUTING
app.use('/client', express.static(__dirname+'/client'));
app.use('/css', express.static(__dirname+'/client/views/css'));
app.use('/js', express.static(__dirname + '/client/js'));

[{name:'css', folder:'/views/css'}, {name:'img', folder:'/views/img'}, {name:'js', folder:'/js'}, {name:'client', folder:''}, {name:'fonts', folder:'/views/img/fonts'}].forEach(function (dir){
    app.use('/'+dir.name, express.static(__dirname+'/client'+dir.folder));
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
});
//PayPal calls


app.get('/create', routes.create);
app.get('/execute', routes.execute);
app.get('/cancel', routes.cancel);



//APP API
app.post('/api/meetups', meetupsController.create);
app.post('/api/emailsubscriptions', emailController.create);
app.post('/api/donation', routes.create);


app.get('/api/meetups', meetupsController.list);
app.get('/api/emailsubscriptions', emailController.list);
app.get('/api/donation', routes.list);

//APP COOKIE SESSION
//app.use(logger());
app.use(cookieParser());
app.use(cookieSession({
    keys: ['key1', 'key2']
}))


app.use(function (req, res, next) {
    var n = req.session.views || 0
    req.session.views = ++n
    res.end(n + ' views')
    console.log(req.session.views);
})

//APP PORT SETUP
http.createServer(app).listen(process.env.PORT || 5000, function(){
    console.log('Express server listening');
});

