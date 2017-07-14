var scores = [90,98,89,100,100,86,94];

function average(grades){
    
    var sum = 0;
    
    for(var i = 0; i < grades.length; i++){
        sum += grades[i];
    }
    
    var average = sum / grades.length;
    return Math.round(average);
}

console.log(average(scores));