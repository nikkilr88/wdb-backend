var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Root route
router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    
});

//Show comment form
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//Show page
router.get("/:id", function(req, res){
    //Find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//Create new campground
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var user = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: user};
    
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

//Edit Campground Route
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: campground});
        }
    });
});

//Update Campground Route
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;