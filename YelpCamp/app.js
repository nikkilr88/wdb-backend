var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth");

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

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

//Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});