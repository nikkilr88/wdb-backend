var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there! Welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    
    var sounds = {
        cat: "meow",
        dog: "woof woof",
        pig: "oink",
        fish: "gulp gulp",
        cow: "moo"
    }
    var animal = req.params.animal.toLowerCase();
    
    if(sounds[animal]){
        var sound = sounds[animal]
        res.send("The " + animal + " says \"" + sound + "\"");
    } else {
        res.send("The " + animal + " says \"wut?\"");
    }
    
});

app.get("/repeat/:word/:num", function(req, res){
    var word = req.params.word;
    var num = Number(req.params.num);
    var string = "";
    
    for(var i = 0; i < num; i++){
        string += word + " ";
    }
    
    res.send(string);
    
});

app.get("*", function(req, res){
    res.send("Sorry, page not found! What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});