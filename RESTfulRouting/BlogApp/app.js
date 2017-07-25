var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

//App config
mongoose.connect("mongodb://localhost/restful-blog-app", {useMongoClient: true});

app.set("view engine", "ejs");    
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
    Blog.find().sort({_id:-1}).find({}, function(err, blogs){
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
    req.body.blog.body = req.sanitize(req.body.blog.body);
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

//Edit Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.redirect("/blogs");
        } else {
           res.render("edit", {blog: blog});  
        }
    });
});

//Update Route
app.put("/blogs/:id", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/"+ req.params.id);
       }
   });
});

//Destroy Route
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});   
