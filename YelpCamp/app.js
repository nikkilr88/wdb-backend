var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

mongoose.Promise = global.Promise;    
    
mongoose.connect("mongodb://localhost/yelp-camp", {useMongoClient: true});

//App config
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
seedDB();

//Passport Config
app.use(require("express-session")({
    secret: "Pizza is awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Landing page
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

//===================
// Auth Routes
//===================

//Show register form
app.get("/register", function(req, res){
   res.render("register"); 
});

//Handle sign up
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

//Handle login
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login "
        
    }), function(req, res){
});

//Logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});