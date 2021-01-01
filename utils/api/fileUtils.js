const fs = require("fs");

class FileUtils {
  constructor(path){
      this.path = path;
  }
    
 async writeToFile(data){
      fs.writeFile(path, data, function(err){
          if(err){
              return console.error(err);
          }
      });
  };
}

module.exports = new FileUtils();
