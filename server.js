var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    meetupsController = require(__dirname +'/server/controllers/meeetups-controllers'),
    emailController = require(__dirname+'/server/controllers/emailsubscription-controller');

//mongoose.connect('mongodb://localhost:27017/energy4life');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
    res.sendFile(__dirname + '/client/views/main.html');
});

[{name:'css', folder:'/views/css'}, {name:'img', folder:'/views/img'}, {name:'js', folder:'/js'}, {name:'client', folder:''}, {name:'fonts', folder:'/views/img/fonts'}].forEach(function (dir){
    app.use('/'+dir.name, express.static(__dirname+'/client'+dir.folder));
});

app.use('/client', express.static(__dirname+'/client'));
app.use('/css', express.static(__dirname+'/client/views/css'));
app.use('/js', express.static(__dirname + '/client/js'));

app.post('/api/meetups', meetupsController.create);
app.post('/api/emailsubscriptions', emailController.create);

app.get('/api/meetups', meetupsController.list);
app.get('/api/emailsubscriptions', emailController.list);

app.listen(2000, function(){
    console.log('I\'m Listening...');
});

