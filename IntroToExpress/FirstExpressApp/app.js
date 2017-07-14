var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
    res.send("Bye!");
});

app.get("/dog", function(req, res){
    res.send("MEOW!");
});

app.get("/r/:subreddit", function(req, res){
    var subreddit = req.params.subreddit;
    res.send("Welcome to the " + subreddit + " subreddit!");
});

app.get("*", function(req, res){
    res.send("You are a star!");
});

//Tell Express to listen on for requests (Start Server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});