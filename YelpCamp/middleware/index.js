//All the middleware goes here, yo.
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if (err) {
                req.flash("error", "Oops! Campground not found.")
                res.redirect("back");
            }
            else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "Nope! That's not yours you silly goose!");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    }
    else {
        req.flash("error", "Please log in.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.redirect("back");
            }
            else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "That's not yours you sly fox you!");
                    res.redirect("/campgrounds/" + req.params.id);

                }
            }
        });
    }
    else {
        req.flash("error", "Please log in.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please log in.");
    res.redirect("/login");
};

module.exports = middlewareObj;
