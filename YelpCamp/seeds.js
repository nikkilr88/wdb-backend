var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Butterfly Woods",
        image: "https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg",
        description: "Lorem ipsum dolor sit amet, vidit deserunt cum ex. Mei vero prompta ut, labores accusamus salutatus id ius. Has te vero melius definitiones, quo id mentitum similique. Pro at vero lucilius. Ei quaeque invenire reformidans eam. Ad eum audire verterem complectitur, id eum noster cetero consequuntur. Has eu liber offendit, sale solet disputando id nec."
    },
    {
        name: "Fox's Path",
        image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg",
        description: "Lorem ipsum dolor sit amet, vidit deserunt cum ex. Mei vero prompta ut, labores accusamus salutatus id ius. Has te vero melius definitiones, quo id mentitum similique. Pro at vero lucilius. Ei quaeque invenire reformidans eam. Ad eum audire verterem complectitur, id eum noster cetero consequuntur. Has eu liber offendit, sale solet disputando id nec."
    },
    {
        name: "Goat's Trail",
        image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg",
        description: "Lorem ipsum dolor sit amet, vidit deserunt cum ex. Mei vero prompta ut, labores accusamus salutatus id ius. Has te vero melius definitiones, quo id mentitum similique. Pro at vero lucilius. Ei quaeque invenire reformidans eam. Ad eum audire verterem complectitur, id eum noster cetero consequuntur. Has eu liber offendit, sale solet disputando id nec."
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds");
        //Add new campgrounds
        data.forEach(function(seed){
           Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   console.log("Created campground");
                   //Add comment on each campground
                   Comment.create({
                       text: "This place is great, but I wish there were internet.",
                       author: "King Joffrey"
                   }, function(err, comment){
                       if(err){
                           console.log(err);
                       } else {
                           campground.comments.push(comment);
                           campground.save();
                           console.log("Created new campground");
                       }
                   });
               }
           }); 
        });
    });
}

module.exports = seedDB;