const fs = require("fs");
  const path = require("path");
const pathToExtension = path.join(
    __dirname,
    "/utils/browser"
  );
  const userDataDir = pathToExtension + "/test-user-data-dir";
  console.log(userDataDir);
  
  const removeDir = function(path) {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path)
  
      if (files.length > 0) {
        files.forEach(function(filename) {
          if (fs.statSync(path + "/" + filename).isDirectory()) {
            removeDir(path + "/" + filename)
          } else {
            fs.unlinkSync(path + "/" + filename)
          }
        })
      } else {
        console.log("No files found in the directory.")
      }
    } else {
      console.log("Directory path not found.")
    }
  }

  function cleanEmptyFoldersRecursively(folder) {
    var isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
      return;
    }
    var files = fs.readdirSync(folder);
    if (files.length > 0) {
      files.forEach(function(file) {
        var fullPath = path.join(folder, file);
        cleanEmptyFoldersRecursively(fullPath);
      });

      // re-evaluate files; after deleting subfolder
      // we may have parent folder empty now
      files = fs.readdirSync(folder);
    }

    if (files.length == 0) {
      console.log("removing: ", folder);
      fs.rmdirSync(folder);
      return;
    }
  }
    
  removeDir(userDataDir);
  cleanEmptyFoldersRecursively(userDataDir);