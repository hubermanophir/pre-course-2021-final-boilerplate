const { json } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
const fs = require("fs");
const uuid = require("uuid");

//create file with the corresponding id as name
app.post("/b", (req, res) => {
  const { body } = req;
  const id = uuid.v4();
  body.id = id;
  if (body) {
    res.status(400).send(`{
      "message": "Bin cannot be blank"
    }`)
  } else {
    fs.writeFile(
      `./src/backend/database/${id}.json`,
      JSON.stringify(body, null, 4),
      (err) => {
        if (err) {
          res.send("error");
        } else {
          res.send(body);
        }
      }
    );
  }
});

//get file with using the id
app.get("/b/:id", (req, res) => {
  fs.readFile(`./src/backend/database/${req.params.id}.json`, (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.send(data);
    }
  });
});

//updates task by its id
app.put("/b/:id", (req, res) => {
  const { body } = req;
  body.id = req.params.id;
  fs.writeFile(
    `./src/backend/database/${req.params.id}.json`,
    JSON.stringify(body, null, 4),
    (err) => {
      if (err) {
        res.send("error");
      } else {
        res.send(body);
      }
    }
  );
});

//deletes an item using the id
app.delete("/b/:id", (req, res) => {
  fs.unlink(`./src/backend/database/${req.params.id}.json`, (err) => {
    if (err) {
      res.send("error!");
    } else {
      res.send("success!");
    }
  });
});

// gets the array of all the objects in the database folder
app.get('/b', (req, res) => {
  const objects = fs.readdirSync("./src/backend/database");
  const arr = [];
  if (objects.length === 0) {
      res.send('you have no objects')
  } else {
    try {
      for (const object of objects) {
        const obj = fs.readFileSync(`./src/backend/database/${object}`)
        arr.push(JSON.parse(obj));
    }
    res.send(arr);
    } catch (error) {
      res.send('error'+er);
    }
    
  }
})

app.listen(PORT);
console.log(`listening on port: ${PORT}`);
