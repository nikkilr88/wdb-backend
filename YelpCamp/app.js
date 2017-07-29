var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.Promise = global.Promise;    
    
mongoose.connect("mongodb://localhost/yelp-camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});


//Index
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    
});

//New
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//Show
app.get("/campgrounds/:id", function(req, res){
    //Find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//Create
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//===================
// Comments Routes
//===================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
           }); 
        }
    });
});

//Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});