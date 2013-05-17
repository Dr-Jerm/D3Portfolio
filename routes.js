var app = require('./server').app,
    videos = require('./static/js/videos').videos,
    bio = require('./static/js/videos').bio;

var util = require('util');

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

app.get('/', function(req,res){
  res.render('index.dust', {  
    title: 'The beginning of a D3 portfolio site'
  });
});

app.get('/JeremyBernstein_Resume_3_2013.pdf', function(req,res){
  var file = __dirname + '/static/JeremyBernstein_Resume_3_2013.pdf'
  res.download(file);
});


//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.render('404.dust');
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

exports.NotFound = NotFound;