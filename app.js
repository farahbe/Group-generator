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
        dbo.collection("students").deletetOne(req.body);
    
        
    })
    res.send('hello')

}
)

app.delete("/delete/:name",function(req, res){

    //console.log(req.body);
    
        MongoClient.connect(url, function(err,db){
            if (err) throw err;
            var dbo = db.db("generator");
            dbo.collection("students").deleteOne({name: req.params.name});
            console.log(req.param.name);
        
            
        })
        res.send('delete')
    
    }
    )



app.listen(8080);