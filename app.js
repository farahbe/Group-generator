var express = require('express')
var app = express()
app.use(express.urlencoded({ extended: true }))
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

/*-------------------------------------------Students sans Async---------------------------------------------*/

app.post("/students",function(req, res){


    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        var dbo = db.db("generator");
        dbo.collection("students").insertOne(req.body);
    
        
    })
    res.send("test")

}
)

app.get("/students",function(req, res){
    
        MongoClient.connect(url, function(err,db){
            if (err) throw err;
            var dbo = db.db("generator");
            dbo.collection("students").find().toArray(function(err,result){
                if (err) throw err
                res.send(result)

            });
        
            
        })
    
    }
    )

app.delete("/students/:name",function(req, res){

    
        MongoClient.connect(url, function(err,db){
            if (err) throw err;
            var dbo = db.db("generator");
            dbo.collection("students").deleteMany({name: req.params.name});
            // console.log(req.param.name);
        
            
        })
        res.send()
    
    }
    )

/*---------------------------------------------GROUPS avec Async---------------------------------------*/


async function Group(){

    const client = new MongoClient(url)
    try{
        await client.connect()
        const db = client.db('generator')
        const groups = await db.collection('groups')
        
        return groups
    }
    catch  (error) {console.log(error)}

}


app.post("/groups", async function(req,res) {
    var collectiongroup = await Group()
    collectiongroup.insertOne(req.body)

    res.send()
    
})

app.get("/groups", async function(req,res) {
    var collectiongroup = await Group()
    var trouve = await collectiongroup.find().toArray()
    res.send(trouve)
    
})

app.delete("/groups/:name",async function(req,res){
    var collectiongroup = await Group()
     await collectiongroup.deleteMany({name: req.params.name})
    res.send()

})




app.listen(8080);