var Record = require('../model/record')
var request = require("request");
module.exports=function(app){
  const baseurl =
  "https://www.googleapis.com/customsearch/v1?key=AIzaSyBDDtCpOsUCbPzXW3T9HZH4ETOFShc82yg&cx=009858263330803687459:raackypdufa&q=";
// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/imagesearch/*", function (req, res) {

  var result=[];
  var urlArray = req.url.split('/');
  var query = urlArray[urlArray.length-1];
  var queryString = query.split('?')[0];
  var offset = req.query.offset
  console.log("offset_____"+offset);
  console.log("query__"+queryString);
  if((offset != '') && (queryString !=''))
  {
    var url=baseurl+queryString;
    console.log("url____"+url);
    request(url, function(error, response, body) {
    Record.create({
      term: queryString,
      when:now()},
      function(err,result){
       if (err) return console.log(err);
       console.log("record saved!!!!");
     });      
     let json = JSON.parse(body);
      console.log(body);
      for(var i in json.items) {    
          var item = json.items[i];   
          result.push({ 
              "url" : item.link,
              "snippet"  : item.snippet,             
          });
      }
         res.json(result);
      });
  }
  else{
    res.json({"error":"invalid url"})
  }
function zeroFill (i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  const d = new Date()
  return d.getFullYear() + '-' +
    zeroFill(d.getMonth() + 1) + '-' +
    zeroFill(d.getDate()) + ' ' +
    zeroFill(d.getHours()) + ':' +
    zeroFill(d.getMinutes())
}  
  
  
});
app.get('/api/latest/imagesearch/', function (req, res){
  Record.find({}).sort('-date').limit(10).exec(function(err, posts){
    if(err) console.log(err);
    res.json(posts);
    ;
});
})
  
app.route('/')
    .get(function(req, res) {

		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

  
}
