var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cats-db", {useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//Add new cat to DB

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 11,
//     temerament: "evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong.");
//     } else {
//         console.log("Cat saved to database: ");
//         console.log(cat);
//     }
// });

//Retrieve all cats and console.log each one
Cat.find(function(err, cats){
    if(err){
        console.log("Uh-oh!");
        console.log(err);
    } else {
        console.log(cats);
    }
});