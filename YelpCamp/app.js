var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp-camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
//Schema End

// Campground.create({
//     name: "Mountain Goat's Rest",
//     image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Campground Added!");
//         console.log(campground);
//     }
// });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});