var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    User                  = require("./models/user"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth-demo", {useMongoClient: true});    

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "I love cheese",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============
// Routes
//==============

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret", function(req, res){
    res.render("secret");
});

//Auth Routes

//Show signup form
app.get("/register", function(req, res){
    res.render("register");
});

//Handle user signup
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            res.redirect("/secret");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});