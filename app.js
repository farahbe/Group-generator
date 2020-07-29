/*-------------------------------Declare nos variables-----------------------------------------------*/
var express = require('express')
var app = express()
app.use(express.urlencoded({ extended: true }))
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
app.set('view engine','ejs');
app.use(express.static('./public'));
const fetch = require('node-fetch')

/*-------------------------------------------Students sans Async---------------------------------------------*/

app.post("/students",async function(req, res){
console.log(req.body)
await fetch('http://localhost:3000/addstudents' ,{

method: 'post',
body: req.body,
headers :{'Content-type': 'application/json'},

})
 
    res.redirect('/students')

})

app.get("/students",async function(req, res){
const appstudents = await fetch('http://localhost:3000/getstudents')
const apidata = await appstudents.json()
console.log(apidata);
    
    res.render('students', {data: apidata});// A partir de la home page, va chercher la page students

});   
    
/*---------------------------------------------GROUPS avec Async---------------------------------------*/


async function Group(){

    const client = new MongoClient(url,{ useUnifiedTopology: true }) //Objet de mango client//
    try{    
        await client.connect()
        const db = client.db('generator')// .db qui permet de recuperer la base de donnee (generator)
        const groups = await db.collection('groups')// va cherche la collection "group" dans db

        app.post("/groups", async function(req,res) {
         const apidata = await fetch('http://localhost:3000/getstudents')
         const students = await apidata.json()
        
         const names = [...students].map(elm => elm.name)  
         const members = req.body.mm
         const grparr = []
         
         for(let i=0; i < students.length / members; i++){
           if(names.length >= members){
             let mmbrarr = []
             for(let i=0; i < members; i++){
               const random = names[Math.floor(Math.random() * names.length)]
               mmbrarr.push(random)
               names.splice(names.indexOf(random), 1)
             }  
             grparr.push([...mmbrarr])
             mmbrarr = []
           } else {
             grparr.push([...names])
           }
         }
         await fetch('http://localhost:3000/addgroups', {
           method: 'post',
           body: JSON.stringify({name: 'projectName', groupmmbr: grparr}),
           headers: {'Content-Type': 'application/json'},
         })
         res.redirect('/groups')
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
