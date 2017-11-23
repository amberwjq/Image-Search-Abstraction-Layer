var mongoose =require('mongoose');

module.exports=function(){
  
  var url="mongodb://dummyuser:dummypassword@ds249325.mlab.com:49325/multivision";
  mongoose.connect(url);
  var db = mongoose.connection;


  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
          // we're connected!
          console.log("Connected correctly to server");
        })




  
}