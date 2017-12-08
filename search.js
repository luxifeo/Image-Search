
const googleIms = require('google-ims');
var mongo = require("mongodb")
var client = googleIms('005410896420463745897:j7paozaqh-a', 'AIzaSyCeSRu1KQZcka9jbneFE236xMyAPO2_kII');
module.exports = function (app){
app.get('/search/:query',function(req,res){
var key = req.params.query;
var num = req.query.offset || 10
mongo.MongoClient.connect("mongodb://admin:admin@ds123146.mlab.com:23146/url", function(err, db) {
  if (err) {
   throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
    }
    var searchObj = {
    value: key,
    time: Date()
  }
    if(key !="favicon.ico")
    db.collection('Searchquery').save(searchObj,function(err,result){
      if (err) throw err;
    })
})

client.search(key, {
    num: num // number
    
}).then(function(images){
  console.log(images)
  res.send(images)
})
})
app.get('/latest',function(req,res){
mongo.MongoClient.connect("mongodb://admin:admin@ds123146.mlab.com:23146/url",function(err, db){
  if(err) throw new Error('Database failed to connect');
  else console.log("Successfully connected");
  var result = db.collection('Searchquery').find({},{_id:0,value:1,time:1}).sort({_id:-1});
  result.toArray(function(err,doc){
    if (err) throw err
    res.send(doc)
  })
})
})
}