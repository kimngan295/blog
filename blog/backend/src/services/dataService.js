var fs = require('fs');

//write file
fs.writeFile("../config/data.txt","New content file",function(err) {
    if(err){
        console.log("write error");
    }else{
        fs.readFile("../config/data.txt", function(err, data) {
            if(err){
                console.log("Read file failed");
            }else{
                console.log(data.toString());
            }
        })
    }
})