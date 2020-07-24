var express = require('express')
var app = express()
app.use(express.urlencoded({ extended: true }))
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

app.post("/",function(req, res){

//console.log(req.body);

    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        var dbo = db.db("generator");
        dbo.collection("students").insertOne(req.body);
    
        
    })
    res.send('hello')

}
)



app.listen(8080);