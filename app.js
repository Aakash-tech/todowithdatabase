const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo");
const tryschema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",tryschema);


app.get("/",function(req,res){
    item.find({}).then(function(foundItems){
        res.render("list",{dayej:foundItems})
    }).catch(function(err){
        console.log(err);
    })
   
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo3 = new item({
        name:itemName
    })
    todo3.save();
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server started");
})