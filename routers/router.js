var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var bp = bodyParser.urlencoded({extended:false});

app.set('views',__dirname+"/views");
app.set("views engine","ejs");

var utilisateurs = [];
exports.utilisateurs = utilisateurs;

router.get('/',function(req,res){
    res.render("utilisateurs.ejs",{utilisateurs:utilisateurs});
});

router.get('/ajout',function(req,res){
    res.render("ajout.ejs");
});

router.post("/confirmAjout",bp,function(req,res){
    var id=req.body.id;
    var login = req.body.login;
    var pwd = req.body.pwd;

    var utilisateur = {id:id,login:login,pwd:pwd};
    utilisateurs.push(utilisateur);
    res.redirect("/utilisateurs");
});

router.post("/modifier",bp,function(req,res){
    var id = req.body.id;
    var login = req.body.login;
    var pwd = req.body.pwd;

    utilisateurs.forEach(function(utilisateur){
        if(utilisateur.id == id){
            utilisateur.login = login;
            utilisateur.pwd = pwd;
        }
    });
    res.redirect("/utilisateurs");
});

router.post("/suprimer",bp,function(req,res){
    var id = req.body.id;
    utilisateurs = utilisateurs.filter(function(utilisateur){
        return (utilisateur.id != id);
    });
    res.redirect("/utilisateurs");
});

module.exports = router;