/*-------------------------------Declare nos variables-----------------------------------------------*/
var express = require('express')
var app = express()
app.use(express.urlencoded({ extended: true }))
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
app.set('view engine','ejs');
app.use(express.static('./public'));

/*-------------------------------------------Students sans Async---------------------------------------------*/

app.post("/students",function(req, res){


    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        var dbo = db.db("generator");
        dbo.collection("students").insertOne(req.body);
    
        
    })
    res.redirect('/students')

}
)

app.get("/students",function(req, res){
    
        MongoClient.connect(url, function(err,db){
            if (err) throw err;
            var dbo = db.db("generator");
            dbo.collection("students").find().toArray(function(err,result){
                if (err) throw err
                //res.send(result)
                console.log(result)
                res.render('students',{data:result});// A partir de la home page, va chercher la page students

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

    const client = new MongoClient(url,{ useUnifiedTopology: true }) //Objet de mango client//
    try{    
        await client.connect()
        const db = client.db('generator')// .db qui permet de recuperer la base de donnee (generator)
        const groups = await db.collection('groups')// va cherche la collection "group" dans db

        app.post("/groups", async function(req,res) {
           groups.insertOne(req.body)
            res.send()
            
        })
        
        app.get("/groups", async function(req,res) {
            var trouve = await groups.find().toArray()
            //res.send() 
            res.render('groups', {data:trouve})  
        })
        
        app.get("/groups/:name",async function(req,res){
            var trouveall = awaitgroups.find({name: req.params.name}).toArray()
            res.send(trouveall)
        })
        
        app.delete("/groups/:name",async function(req,res){
             awaitgroups.deleteMany({name: req.params.name})
            res.send()
        })
        
    }
    catch  (error) {console.log(error)}


}

Group()

app.listen(8080);