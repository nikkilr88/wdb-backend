var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg"},
        {name: "Granie Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"},
        {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg"},
        {name: "Granie Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"},
        {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg"},
        {name: "Granie Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"}
    ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    
    campgrounds.push(newCampground);
    
    res.redirect("/campgrounds");
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});