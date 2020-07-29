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
await fetch('http://localhost:3000/addstudents' ,{

method: 'post',
body: JSON.stringify(req.body),
headers :{'Content-type': 'application/json'},

})
 
    res.redirect('/students')

})

app.get("/students",async function(req, res){
const appstudents = await fetch('http://localhost:3000/getstudents')
const apidata = await appstudents.json()
    
    res.render('students', {data: apidata});// A partir de la home page, va chercher la page students

});   
    
/*---------------------------------------------GROUPS avec Async---------------------------------------*/

app.get("/groups", async function (req, res){
const appsgroups = await fetch('http://localhost:3000/getsgroups')
const apidata2 = await appsgroups.json()
    res.render('groups', {data: apidata2});

});

app.post("/groups", async function(req,res) {
    const apidata = await fetch('http://localhost:3000/getstudents')
    const students = await apidata.json()
   
    const names = [...students].map(elm => elm.name)//fait une copie du tableau et filtre
    const members = req.body.mmbr
    const grparr = []
    
    for(let i=0; i < students.length / members; i++){// nombre de personne et divise par le nombre de personne dans chaque groupe
      if(names.length >= members){//si il reste des etudiants qui n'ont pas de groupe
        let mmbrarr = []
        for(let i=0; i < members; i++){//repete le nombre de students dans chaque groupe (exemple: 2 student ds groupe genrator repeter 3 fois)
          const random = names[Math.floor(Math.random() * names.length)]//recupere avec le random le noms
          mmbrarr.push(random)//on met le nom dans le tableau mmbrarr
          names.splice(names.indexOf(random), 1)//Supprime le noms, si il a deja etait selectionne
        }  
        grparr.push([...mmbrarr])//push le tablau qui contient les groupes
        mmbrarr = []
      } else {
        grparr.push([...names])// tableau ou l'on stock les groupes (On y met les noms qui n'ont pas de groupe)
      }
    }
    await fetch('http://localhost:3000/addgroups', {
      method: 'post',
      body: JSON.stringify({name: req.body.name, groupmmbr: grparr}),
      headers: {'Content-Type': 'application/json'},
    })
    res.redirect('/groups')
   })


app.listen(8080);