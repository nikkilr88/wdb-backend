var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//App config
mongoose.connect("mongodb://localhost/restful-blog-app", {useMongoClient: true});

app.set("view engine", "ejs");    
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//Index Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Something went wrong");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//New Route
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

//Create Route
app.post("/blogs", function(req, res){
    console.log(req.body.blog);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("Something went wrong");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Show Route 
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log("Something went wrong");
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: blog});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});   
