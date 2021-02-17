const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
// const todoItems = require("./b.json");
const fs = require("fs");
const path = require('path');
app.listen(port);

const getAllDirFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllDirFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(file)
    }
  })

  return arrayOfFiles
}


// console.log(getAllDirFiles('./b').length);
//gets all the tasks
app.get("/b", (req, res) => {
  res.send();
});


app.get("/b/:collectionName/:jsonName", (req, res) => {
  fs.readFile(`b/${req.params.collectionName}/${req.params.jsonName}.json`, 'utf8', (err,data) => { 
    if (err) {
          res.send(err);
      } else {
          res.send(data);
      }
  })
    
});

//gets a specific task
app.get("/b/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.send(todoItems.filter((item) => item.id === id));
});

// //pushes a json
// app.post("/b", (req, res) => {
//   todoItems.push(req.body);
//   fs.writeFileSync('./todoItems.json', JSON.stringify(todoItems));
//   res.send(req.body);
// });

// //updates an object
// app.put("/b/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   for (let i = 0; i < todoItems.length; i++) {
//     if (todoItems[i].id === id) {
//       todoItems[i] = req.body;
//       res.send(req.body);
//     }
//   }
// });

// //deletes an item using id
// app.delete("/b/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   for (let i = 0; i < todoItems.length; i++) {
//     if (todoItems[i].id === id) {
//       todoItems.splice(i, 1);
//       res.send("removed");
//     }
//   }
// });

